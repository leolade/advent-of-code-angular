import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as ts from "typescript";

function pad2(n: number) { return n < 10 ? `0${n}` : `${n}`; }

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generateDay(options: { year: string | number; day: string | number }): Rule {
  return (tree: Tree, _context: SchematicContext) => {    if (!options || !options.year || !options.day) {
      throw new Error('You must provide --year and --day');
  }

      const year = String(options.year);
      const dayNum = parseInt(String(options.day), 10);
      if (isNaN(dayNum) || dayNum <= 0) {
          throw new Error('Invalid day value');
      }
      const day = dayNum;

      const baseDir = `src/app/${year}/day-${day}`;

      // Create folder files
      const inputPath = `${baseDir}/input.txt`;
      if (!tree.exists(inputPath)) {
          tree.create(inputPath, '');
          _context.logger.info(`Created ${inputPath}`);
      }

      const readmePath = `${baseDir}/README.md`;
      if (!tree.exists(readmePath)) {
          tree.create(readmePath, `# ${year} - Day ${day}\n\nPlace your input in input.txt.`);
          _context.logger.info(`Created ${readmePath}`);
      }

      const wrapperPath = `${baseDir}/day-${day}.ts`;
      if (!tree.exists(wrapperPath)) {
          const wrapperContent = `import { Component } from '@angular/core';\nimport { PuzzleDay } from '../../puzzle-day/puzzle-day';\n\n@Component({\n  selector: 'app-${year}-day-${day}',\n  standalone: true,\n  imports: [PuzzleDay],\n  template: '<app-puzzle-day></app-puzzle-day>',\n})\nexport class Day${pad2(day)}Component { }\n`;
          tree.create(wrapperPath, wrapperContent);
          _context.logger.info(`Created ${wrapperPath}`);
      }

      const mainPath = 'src/main.ts';
      if (!tree.exists(mainPath)) {
          _context.logger.warn('src/main.ts not found - skipping route/nav insertion');
          return tree;
      }

      const buffer = tree.read(mainPath);
      if (!buffer) return tree;
      let content = buffer.toString('utf8');

      // Add import after the last import statement
      const source = ts.createSourceFile(mainPath, content, ts.ScriptTarget.Latest, true);
      let lastImportEnd = 0;
      source.statements.forEach(stmt => {
          if (ts.isImportDeclaration(stmt) || ts.isImportEqualsDeclaration(stmt)) {
              lastImportEnd = Math.max(lastImportEnd, stmt.end);
          }
      });

      const relImport = `./app/${year}/day-${day}/day-${day}`;
      const importLine = `import { Day${pad2(day)}Component } from '${relImport}';\n`;
      if (!content.includes(importLine)) {
          content = content.slice(0, lastImportEnd) + '\n' + importLine + content.slice(lastImportEnd);
          _context.logger.info('Inserted import for wrapper component.');
      } else {
          _context.logger.info('Import already present - skipping import insertion.');
      }

      // Parse again to find routes variable
      const source2 = ts.createSourceFile(mainPath, content, ts.ScriptTarget.Latest, true);
      let routesFound = false;
      source2.forEachChild(node => {
          if (ts.isVariableStatement(node)) {
              node.declarationList.declarations.forEach(decl => {
                  if (ts.isIdentifier(decl.name) && decl.name.text === 'routes' && decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
                      // inspect array elements
                      const arr = decl.initializer;
                      arr.elements.forEach(el => {
                          if (ts.isObjectLiteralExpression(el)) {
                              // find path property
                              const pathProp = el.properties.find(p => ts.isPropertyAssignment(p) && ((ts.isIdentifier(p.name) && p.name.text === 'path') || (ts.isStringLiteral((p.name as any)) && (p.name as any).text === 'path')) ) as ts.PropertyAssignment | undefined;
                              if (pathProp && ts.isPropertyAssignment(pathProp) && ts.isStringLiteral(pathProp.initializer) && pathProp.initializer.text === year) {
                                  routesFound = true;
                                  // find children property
                                  const childrenProp = el.properties.find(p => ts.isPropertyAssignment(p) && ((ts.isIdentifier(p.name) && p.name.text === 'children') || (ts.isStringLiteral((p.name as any)) && (p.name as any).text === 'children')) ) as ts.PropertyAssignment | undefined;
                                  if (childrenProp && ts.isPropertyAssignment(childrenProp) && ts.isArrayLiteralExpression(childrenProp.initializer)) {
                                      const childrenArr = childrenProp.initializer;
                                      // compute insertion position (before ])
                                      const insertPos = childrenArr.end - 1;
                                      const entry = `\n      { path: 'day-${day}', component: Day${pad2(day)}Component },`;
                                      if (!content.includes(`day-${day}`)) {
                                          content = content.slice(0, insertPos) + entry + content.slice(insertPos);
                                          _context.logger.info(`Inserted child route for day-${day}`);
                                      } else {
                                          _context.logger.info('Route already present - skipping route insertion.');
                                      }
                                  }
                              }
                          }
                      });
                  }
              });
          }
      });

      if (!routesFound) {
          _context.logger.warn(`Could not find routes entry for year ${year} in src/main.ts; route not inserted.`);
      }

      // Insert nav link inside <nav>..</nav>
      const navStart = content.indexOf('<nav>');
      const navEnd = content.indexOf('</nav>');
      if (navStart !== -1 && navEnd !== -1 && navEnd > navStart) {
          const navSlice = content.slice(navStart, navEnd);
          const link = `      <a routerLink="/${year}/day-${day}">${year} Day ${day}</a> |`;
          if (!navSlice.includes(link)) {
              content = content.slice(0, navEnd) + '\n' + link + content.slice(navEnd);
              _context.logger.info('Inserted nav link for day-' + day + '.');
          } else {
              _context.logger.info('Nav link already present; skipping nav update.');
          }
      } else {
          _context.logger.warn('Could not find <nav> in src/main.ts; skipping nav update.');
      }

      tree.overwrite(mainPath, content);

      return tree;
  };
}
