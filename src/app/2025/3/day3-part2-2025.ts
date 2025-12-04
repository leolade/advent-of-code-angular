import {inject, Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";
import {ArrayUtils} from "../../utils/services/array-utils";

@Injectable()
export class Day3Part22025 extends Solution<string, number> {

  arrayUtils: ArrayUtils = inject(ArrayUtils);

  problemName = 'Lobby - Part 2';

  protected override process(input: string): number {
    return this.inputUtils.toNumber2DArray(input)
      .map(batterie => {
        let highestCandidates: number[] = [];
        let remainingBatteries: number[] = [...batterie];
        while (highestCandidates.length < 12) {
          let highestCandidate = Math.max(...remainingBatteries.slice(0, remainingBatteries.length - 11 + highestCandidates.length));
          highestCandidates.push(highestCandidate);
          remainingBatteries = remainingBatteries.slice(remainingBatteries.indexOf(highestCandidate) + 1);
        }
        return parseInt(highestCandidates.join(''));
      })
      .reduce(this.arrayUtils.sum, 0);
  }
}
