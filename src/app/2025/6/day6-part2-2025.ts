import {inject, Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";
import {ArrayUtils} from "../../utils/services/array-utils";

@Injectable()
export class Day6Part22025 extends Solution<string, number> {

    problemName = 'Trash Compactor - Part 2';

    arrayUtils: ArrayUtils = inject(ArrayUtils);

    protected override process(input: string): number {
        const splitIndex: number[] = [];
        const array2D = this.inputUtils.toString2DArray(input);
        array2D[0].forEach((item, i) => {
            if (array2D.map((item2D) => item2D[i]).join('').trim() === '') {
                splitIndex.push(i);
            }
        })
        const parsedInput: string[][] = [];
        let acc = '';
        array2D
            .forEach((line, index) => {
                line.forEach((char, charIndex) => {
                    if (splitIndex.includes(charIndex)) {
                        parsedInput[index] = [...(parsedInput[index] || []), acc];
                        acc = '';
                    } else {
                        acc += char;
                    }
                });
                parsedInput[index] = [...(parsedInput[index] || []), acc];
                acc = '';
            });
        const problems: [string, number[]][] = parsedInput[0].map(
            (col, colIndex) => {
                return parsedInput.map(((row: string[]) => row[colIndex]));
            }
        ).map((line) => [line.pop()?.trim() ?? '', this.rearrangeNumberByCol([...line])]).reverse() as [string, number[]][];

        const solutions: number[] = problems
            .reverse()
            .map(([operation, numbers]: [string, number[]]) => {
                return (numbers.slice(1) || []).reduce<number>((prev, curr) => {
                    switch (operation) {
                        case '*':
                            return prev * curr;
                        case '+':
                            return prev + curr;
                        case '/':
                            return prev / curr;
                        case '-':
                            return prev - curr;
                    }
                    return 0;
                }, numbers[0])
            })
        return solutions
            .reduce(this.arrayUtils.sum, 0);
    }

    private rearrangeNumberByCol(strings: string[]) {
        const maxStringLength = Math.max(...strings.map(s => s.length));
        const paddedStrings: string[][] = strings
            .map(s => s.padEnd(maxStringLength, ' ').split('').reverse());
        const acc: number[] = [];
        paddedStrings[0].forEach((_, charIndex) => {
            acc.push(parseInt(paddedStrings.map(s => s[charIndex] || ' ').join('')));
        });
        return acc;
    }
}
