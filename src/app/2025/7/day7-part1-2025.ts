import { Injectable } from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Day7Part12025 extends Solution<string, number> {

    problemName = 'Laboratories - Part 1';

    protected override process(input: string): number {
        let acc: number = 0;
        const lines = this.inputUtils.toString2DArray(input);
        for (let y = 1; y < lines.length; y++) {
            for (let x = 0; x < lines[y].length; x++) {
                if (lines[y - 1][x] === 'S') {
                    lines[y][x] = '|';
                }
                if (lines[y-1][x] === '|') {
                    if(lines[y][x] === '.') {
                        lines[y][x] = '|';
                    }
                    if (lines[y][x] === '^') {
                        if (x - 1 >= 0) {
                            lines[y][x - 1] = '|';
                        }
                        if (x + 1 < lines[y].length) {
                            lines[y][x + 1] = '|';
                        }
                        acc++;
                    }
                }
            }
        }
        console.log(lines.map(line => line.join('')).join('\n'));
        return acc;
    }

}
