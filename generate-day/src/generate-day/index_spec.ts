import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { addPuzzleEntry } from './index';

const collectionPath = path.join(__dirname, '../collection.json');

describe('generate-day', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    // Construire un arbre contenant src/puzzle-registred.ts
    const tree = Tree.empty();
    const baseContent = `export interface PuzzleRegistred {\n    year: number;\n    day: number;\n}\n\nexport const puzzledRegistred: PuzzleRegistred[] = [\n    {year: 2015, day: 1},\n];\n`;
    tree.create('src/puzzle-registred.ts', baseContent);

    const result = await runner.runSchematic('generate-day', { year: 2015, day: 1 }, tree);

    expect(result.files).toEqual(jasmine.any(Array));
  });

  describe('addPuzzleEntry', () => {
    const baseContent = `export interface PuzzleRegistred {
    year: number;
    day: number;
}

export const puzzledRegistred: PuzzleRegistred[] = [
    {year: 2015, day: 1},
    {year: 2015, day: 2},
    {year: 2016, day: 2},
];
`;

    it('ajoute une entrée si elle n\'existe pas', () => {
      const out = addPuzzleEntry(baseContent, 2017, 3);
      expect(out).toContain('{year: 2017, day: 3}');
      // L'entrée doit être insérée avant la séquence '];'
      const insertIndex = out.indexOf('{year: 2017, day: 3}');
      const closingIndex = out.indexOf('];');
      expect(insertIndex).toBeGreaterThan(-1);
      expect(insertIndex).toBeLessThan(closingIndex);
    });

    it('ne modifie pas le contenu si l\'entrée existe déjà', () => {
      const out = addPuzzleEntry(baseContent, 2015, 1);
      expect(out).toBe(baseContent);
    });

    it('lève une erreur si le tableau est absent', () => {
      const bad = 'export const foo = 1;';
      expect(() => addPuzzleEntry(bad, 2020, 1)).toThrowError(/introuvable|mal formé/i);
    });

    it('lève une erreur si year/day ne sont pas entiers', () => {
      expect(() => addPuzzleEntry(baseContent, 2020.5, 1)).toThrowError(/entiers/i);
      expect(() => addPuzzleEntry(baseContent, 2020, NaN)).toThrowError(/entiers/i);
    });
  });

  describe('routes insertion', () => {
    it('insère une virgule si nécessaire avant d\'ajouter une route', async () => {
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const tree = Tree.empty();

      // puzzle-registred nécessaire
      const puzzle = `export interface PuzzleRegistred {\n  year: number;\n  day: number;\n}\n\nexport const puzzledRegistred: PuzzleRegistred[] = [\n  {year: 2024, day: 1},\n];\n`;
      tree.create('src/puzzle-registred.ts', puzzle);

      // app.routes.ts initial avec un seul objet sans virgule finale entre objets
      const badRoutes = `import {PuzzleDay} from "./puzzle-day/puzzle-day";\nimport {PUZZLE_INPUT} from "./puzzle-day/puzzle-input";\nimport {Routes} from "@angular/router";\n\nexport const routes: Routes = [\n    {\n        path: '2024/1/1',\n        component: PuzzleDay,\n        providers: [{provide: PUZZLE_INPUT, useValue: null}]\n    }\n];\n`;
      tree.create('src/app/app.routes.ts', badRoutes);

      const result = await runner.runSchematic('generate-day', { year: 2024, day: 1 }, tree);

      const updated = result.readText('src/app/app.routes.ts');
      // on doit trouver la nouvelle route 2024/1/2 et la virgule séparatrice '},' avant
      expect(updated).toContain("path: '2024/1/2'");
      expect(updated).toContain('},\n    {\n        path: \"2024/1/2\"'.replace(/\"/g, "'"));
    });
  });

});
