import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';

// Fonction utilitaire : prend le contenu complet de `puzzle-registred.ts`,
// vérifie l'absence de l'entrée et insère `{year, day}` juste avant la clôture du tableau.
export function addPuzzleEntry(content: string, year: number, day: number): string {
    if (!Number.isInteger(year) || !Number.isInteger(day)) {
        throw new Error('Les paramètres year et day doivent être des entiers');
    }

    // Eviter l'échappement redondant de ']' dans la regex
    const arrayDeclRegex = /export\s+const\s+puzzledRegistred\s*:\s*PuzzleRegistred\s*\[\s*]\s*=\s*\[/m;
    const match = content.match(arrayDeclRegex);
    if (!match || typeof match.index !== 'number') {
        throw new Error('Tableau `puzzledRegistred` introuvable ou mal formé dans le fichier');
    }

    const arrayStartIndex = content.indexOf('[', match.index);
    const arrayEndIndex = content.indexOf('];', arrayStartIndex);
    if (arrayStartIndex === -1 || arrayEndIndex === -1) {
        throw new Error('Impossible de localiser les bornes du tableau `puzzledRegistred`');
    }

    // Vérifier si l'entrée existe déjà (tolérant aux espaces)
    const entryRegex = new RegExp("\\{\\s*year\\s*:\\s*" + year + "\\s*,\\s*day\\s*:\\s*" + day + "\\s*\\}", 'm');
    if (entryRegex.test(content)) {
        // si déjà présente, on retourne le contenu inchangé
        return content;
    }

    // Construire l'entrée avec indentation cohérente
    const entry = `    {year: ${year}, day: ${day}},\n`;

    const newContent = content.slice(0, arrayEndIndex) + entry + content.slice(arrayEndIndex);
    return newContent;
}

function partNames(day: number, year: number, part: number) {
    const inputVar = `part${part}Day${day}${year}Input`;
    const className = `Part${part}Day${day}${year}`;
    const inputFile = `./${year}/${day}/part${part}-day${day}-${year}-input`;
    const classFile = `./${year}/${day}/part${part}-day${day}-${year}`;
    return {inputVar, className, inputFile, classFile};
}

function createPartFiles(tree: Tree, year: number, day: number, part: number) {
    const {inputVar, className} = partNames(day, year, part);
    const inputPath = `src/app/${year}/${day}/part${part}-day${day}-${year}-input.ts`;
    const classPath = `src/app/${year}/${day}/part${part}-day${day}-${year}.ts`;

    if (!tree.exists(inputPath)) {
        const inputContent = `export const ${inputVar}: string = '';
`;
        tree.create(inputPath, inputContent);
    }

    if (!tree.exists(classPath)) {
        const classContent = `import { Injectable } from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class ${className} extends Solution<string, string> {

    protected override process(input: string): string {
        return 'Method not implemented.';
    }
  
}
`;
        tree.create(classPath, classContent);
    }
}

function updateAppRoutes(tree: Tree, _context: SchematicContext, year: number, day: number) {
    const routesPath = 'src/app/app.routes.ts';
    if (!tree.exists(routesPath)) {
        _context.logger.info(`${routesPath} introuvable — saut de la mise à jour des routes`);
        return;
    }

    const buffer = tree.read(routesPath);
    if (!buffer) {
        _context.logger.warn(`Impossible de lire ${routesPath}`);
        return;
    }
    let content = buffer.toString('utf-8');

    // Préparer imports à insérer (si absents)
    const p1 = partNames(day, year, 1);
    const p2 = partNames(day, year, 2);

    const importLines: string[] = [];
    const import1Input = `import {${p1.inputVar}} from "${p1.inputFile}";`;
    const import1Class = `import {${p1.className}} from "${p1.classFile}";`;
    const import2Input = `import {${p2.inputVar}} from "${p2.inputFile}";`;
    const import2Class = `import {${p2.className}} from "${p2.classFile}";`;

    if (!content.includes(import1Input)) { importLines.push(import1Input); }
    if (!content.includes(import1Class)) { importLines.push(import1Class); }
    if (!content.includes(import2Input)) { importLines.push(import2Input); }
    if (!content.includes(import2Class)) { importLines.push(import2Class); }

    if (importLines.length > 0) {
        // insérer après le dernier import existant
        const importRegex = /import\s+.*from\s+['\"].*['\"];?/g;
        let lastMatch: RegExpExecArray | null = null;
        let m: RegExpExecArray | null;
        while ((m = importRegex.exec(content)) !== null) {
            lastMatch = m;
        }
        const insertPos = lastMatch ? lastMatch.index + lastMatch[0].length : 0;
        const prefix = insertPos === 0 ? '' : '\n';
        content = content.slice(0, insertPos) + prefix + importLines.join('\n') + '\n' + content.slice(insertPos);
    }

    // Construire les routes à ajouter
    const route1 = `    {
        path: '${year}/${day}/1',
        component: PuzzleDay,
        providers: [{provide: PUZZLE_INPUT, useValue: ${p1.inputVar}}, {
            provide: SOLUTION_SERVICE,
            useClass: ${p1.className}
        }]
    },\n`;

    const route2 = `    {
        path: '${year}/${day}/2',
        component: PuzzleDay,
        providers: [{provide: PUZZLE_INPUT, useValue: ${p2.inputVar}}, {
            provide: SOLUTION_SERVICE,
            useClass: ${p2.className}
        }]
    },\n`;

    // Repérer la déclaration export const routes: Routes = [
    const routesDeclRegex = /export\s+const\s+routes\s*:\s*Routes\s*=\s*\[/m;
    const routesMatch = content.match(routesDeclRegex);
    if (!routesMatch || typeof routesMatch.index !== 'number') {
        _context.logger.warn('Tableau `routes` introuvable dans app.routes.ts — ajout ignoré');
        tree.overwrite(routesPath, content);
        return;
    }

    const routesStart = content.indexOf('[', routesMatch.index);
    if (routesStart === -1) {
        _context.logger.warn('Impossible de localiser le début du tableau `routes` — ajout ignoré');
        tree.overwrite(routesPath, content);
        return;
    }

    // helper pour trouver la position de clôture la plus proche et s'assurer des séparateurs
    const findRoutesEnd = (src: string) => src.indexOf('];', routesStart);

    let routesEnd = findRoutesEnd(content);
    if (routesEnd === -1) {
        _context.logger.warn('Impossible de localiser la fin du tableau `routes` — ajout ignoré');
        tree.overwrite(routesPath, content);
        return;
    }

    // Vérifier si les routes existent déjà
    const route1Regex = new RegExp(`path\\s*:\\s*'${year}/${day}/1'`);
    const route2Regex = new RegExp(`path\\s*:\\s*'${year}/${day}/2'`);

    // Fonction utilitaire pour insérer un bloc avant routesEnd en s'assurant d'un séparateur ','
    const insertRouteSafely = (src: string, block: string) => {
        const endPos = findRoutesEnd(src);
        if (endPos === -1) return src; // sécurité
        // trouver le dernier caractère non blanc avant endPos
        let i = endPos - 1;
        while (i >= 0 && /\s/.test(src[i])) i--;
        // si le caractère trouvé est '}', on normalise l'espace entre '}' et '];' en ',\n'
        if (i >= 0 && src[i] === '}') {
            // remplacer la portion entre i+1 et endPos par ',\n'
            src = src.slice(0, i + 1) + ',' + '\n' + src.slice(endPos);
            // recalculer endPos et insérer le bloc juste avant la nouvelle '];'
            const newEnd = findRoutesEnd(src);
            const insertAt = newEnd === -1 ? endPos + 1 : newEnd;
            return src.slice(0, insertAt) + block + src.slice(insertAt);
        }
        // si pas de '}' détecté, on insère avant endPos sans modifications
        return src.slice(0, endPos) + block + src.slice(endPos);
    };

    if (!route1Regex.test(content)) {
        content = insertRouteSafely(content, route1);
    } else {
        _context.logger.info(`Route ${year}/${day}/1 déjà présente — pas d'ajout`);
    }

    if (!route2Regex.test(content)) {
        content = insertRouteSafely(content, route2);
    } else {
        _context.logger.info(`Route ${year}/${day}/2 déjà présente — pas d'ajout`);
    }

    // Nettoyage : normaliser la séparation entre objets du tableau routes en une forme unique
    // Cas visés :
    //  - '},\n\n    {'
    //  - '}\n,\n    {'
    //  - '}\n    {' (virgule manquante)
    content = content.replace(/}\s*,?\s*\n\s*\n\s*\{/g, '},\n    {');
    content = content.replace(/}\s*\n\s*,\s*\n\s*\{/g, '},\n    {');
    content = content.replace(/}\s*\n\s*\{/g, '},\n    {');

    tree.overwrite(routesPath, content);
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generateDay(options: { year: string | number; day: string | number }): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        if (!options || !options.year || !options.day) {
            throw new Error('You must provide --year and --day');
        }

        const filePath = 'src/puzzle-registred.ts';
        if (!tree.exists(filePath)) {
            throw new Error(`Fichier ${filePath} introuvable`);
        }

        const buffer = tree.read(filePath);
        if (!buffer) {
            throw new Error(`Impossible de lire ${filePath}`);
        }
        const content = buffer.toString('utf-8');

        const yearNum = Number(options.year);
        const dayNum = Number(options.day);
        if (!Number.isInteger(yearNum) || !Number.isInteger(dayNum)) {
            throw new Error('Les paramètres --year et --day doivent être des entiers');
        }

        const newContent = addPuzzleEntry(content, yearNum, dayNum);

        // Si addPuzzleEntry a simplement retourné le même contenu (entrée existante), on peut l'écrire quand même
        if (newContent === content) {
            _context.logger.info(`Entrée pour year=${yearNum} day=${dayNum} déjà présente — rien à faire`);
        } else {
            tree.overwrite(filePath, newContent);
            _context.logger.info(`Ajouté {year: ${yearNum}, day: ${dayNum}} dans ${filePath}`);
        }

        // Créer les fichiers pour part1 et part2
        createPartFiles(tree, yearNum, dayNum, 1);
        createPartFiles(tree, yearNum, dayNum, 2);

        // Mettre à jour app.routes.ts si présent
        updateAppRoutes(tree, _context, yearNum, dayNum);

        return tree;
    };
}
