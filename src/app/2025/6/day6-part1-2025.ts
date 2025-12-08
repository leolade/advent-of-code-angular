import {inject, Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";
import {ArrayUtils} from "../../utils/services/array-utils";

@Injectable()
export class Day6Part12025 extends Solution<string, number> {

  problemName = 'Trash Compactor - Part 1';

  arrayUtils: ArrayUtils = inject(ArrayUtils);

  protected override process(input: string): number {
    const problems: [string, number[]][] = this.inputUtils.toStringArray(input)
      .map(l => this.inputUtils.splitByWhitespaces(l))
      .reduce<[string, number[]][]>((prev, curr, index, array) => {
        const isLast = index === array.length - 1;
        curr.forEach((n, i) => {
          if (isLast) {
            prev[i][0] = n;
          } else if (prev[i]) {
            prev[i][1].push(parseInt(n));
          } else {
            prev[i] = ['', [parseInt(n)]];
          }
        });
        return prev;
      }, []);
    console.log(problems);
    const solutions: number[] = problems.map(([operation, numbers]: [string, number[]]) => {
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
    console.log(solutions);
    return solutions
      .reduce(this.arrayUtils.sum, 0);
  }

}
