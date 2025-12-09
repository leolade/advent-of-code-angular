import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Day7Part22025 extends Solution<string, number> {

  problemName = 'Laboratories - Part 2';

  mapLetterToNumber: Map<string, number> = new Map([
    ['.', 0],
    ['0', 0],
    ['1', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['A', 10],
    ['B', 11],
    ['C', 12],
    ['D', 13],
    ['E', 14],
    ['F', 15],
    ['G', 16],
    ['H', 17],
    ['I', 18],
    ['J', 19],
    ['K', 20],
    ['L', 21],
    ['M', 22],
    ['N', 23],
    ['O', 24],
    ['P', 25],
    ['Q', 26],
    ['R', 27],
    ['S', 28],
    ['T', 29],
    ['U', 30],
    ['V', 31],
    ['W', 32],
    ['X', 33],
    ['Y', 34],
    ['Z', 35],
]);
  mapNumberToLetter: Map<number, string> = new Map([
    [0, '0'],
    [1, '1'],
    [2, '2'],
    [3, '3'],
    [4, '4'],
    [5, '5'],
    [6, '6'],
    [7, '7'],
    [8, '8'],
    [9, '9'],
    [10, 'A'],
    [11, 'B'],
    [12, 'C'],
    [13, 'D'],
    [14, 'E'],
    [15, 'F'],
    [16, 'G'],
    [17, 'H'],
    [18, 'I'],
    [19, 'J'],
    [20, 'K'],
    [21, 'L'],
    [22, 'M'],
    [23, 'N'],
    [24, 'O'],
    [25, 'P'],
    [26, 'Q'],
    [27, 'R'],
    [28, 'S'],
    [29, 'T'],
    [30, 'U'],
    [31, 'V'],
    [32, 'W'],
    [33, 'X'],
    [34, 'Y'],
    [35, 'Z'],
]);

  protected override process(input: string): number {
    let acc = 0;
    const diagram = this.inputUtils.toString2DArray(input);
    for (let y = 1; y < diagram.length; y++) {
      for (let x = 0; x < diagram[y].length; x++) {
        if (diagram[y - 1][x] === 'S') {
          diagram[y][x] = '|';
        }
        if (diagram[y-1][x] === '|') {
          if(diagram[y][x] === '.') {
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
    for (let row = 1; row < diagram.length; row++) {
      for (let col = 0; col < diagram[row].length - 1; col++) {
        if (row === 0) {
          continue;
        }
        if (row === 1) {
          if (diagram[row][col] === '|') {
            diagram[row][col] = '1';
          }
        }
        if (row % 2 === 0) {
          if (diagram[row][col] === '|') {
            diagram[row][col] = diagram[row - 1][col];
          }
        }
        if (row % 2 !== 0) {
          if (diagram[row][col] !== '|') {
            continue
          }
          diagram[row][col] = '0';
          if (diagram[row][col - 1] === '^' && diagram[row - 1][col - 1] !== '.') {
            diagram[row][col] = this.mapNumberToLetter.get(this.mapLetterToNumber.get(diagram[row][col]) + this.mapLetterToNumber.get(diagram[row - 1][col - 1]));
          }

          if (diagram[row][col + 1] === '^' && diagram[row - 1][col + 1] !== '.') {
            acc += 1;
          }
        }

      }
    }
    return acc - 1;
  }

}
