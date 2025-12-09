import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Day7Part22025 extends Solution<string, number> {

    problemName = 'Laboratories - Part 2';

    protected override process(input: string): number {
        let acc = 0;
        const diagram = this.inputUtils.toString2DArray(input);
        for (let y = 1; y < diagram.length; y++) {
            for (let x = 0; x < diagram[y].length; x++) {
                if (diagram[y - 1][x] === 'S') {
                    diagram[y][x] = '|';
                }
                if (diagram[y - 1][x] === '|') {
                    if (diagram[y][x] === '.') {
                        diagram[y][x] = '|';
                    }
                    if (diagram[y][x] === '^') {
                        if (x - 1 >= 0) {
                            diagram[y][x - 1] = '|';
                        }
                        if (x + 1 < diagram[y].length) {
                            diagram[y][x + 1] = '|';
                        }
                    }
                }
            }
        }
        const safeNumber = (number: number) => isNaN(number) ? 0 : number;
        for (let row = 1; row < diagram.length; row++) {
            if (row === 0) {
                continue;
            }
            for (let col = 0; col < diagram[row].length; col++) {
                if (row === 1) {
                    if (diagram[row][col] === '|') {
                        diagram[row][col] = '1';
                    }
                }
                if (row % 2 !== 0) {
                    if (diagram[row][col] === '|') {
                        diagram[row][col] = diagram[row - 1][col];
                    }
                }
                if (row % 2 === 0) {
                    if (diagram[row][col] !== '|') {
                        continue
                    }
                    diagram[row][col] = diagram[row - 1][col];
                    if (diagram[row][col - 1] === '^' && diagram[row - 1][col - 1] !== '.') {
                        diagram[row][col] = safeNumber(parseInt(diagram[row][col])) + safeNumber(parseInt(diagram[row - 1][col - 1])) + '';
                    }

                    if (diagram[row][col + 1] === '^' && diagram[row - 1][col + 1] !== '.') {
                        diagram[row][col] = safeNumber(parseInt(diagram[row][col])) + safeNumber(parseInt(diagram[row - 1][col + 1])) + '';
                    }
                }

            }
        }

        console.log(diagram.map(line => line.join('')).join('\n'));
        return diagram[diagram.length - 1].reduce((acc, v) => acc + safeNumber(parseInt(v)), 0);
    }

}
