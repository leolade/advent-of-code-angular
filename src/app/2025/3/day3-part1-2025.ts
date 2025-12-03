import {inject, Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";
import {ArrayUtils} from "../../utils/services/array-utils";

@Injectable()
export class Day3Part12025 extends Solution<string, number> {

  arrayUtils: ArrayUtils = inject(ArrayUtils);

  problemName = 'Lobby - Part 1';

  protected override process(input: string): number {
    return this.inputUtils.toNumber2DArray(input)
      .map(batterie => {
        let highestJoltage: number | null = null;
        const highestJoltageValue = Math.max(...batterie);
        if (batterie.indexOf(highestJoltageValue) === batterie.length - 1) {
          highestJoltage = parseInt(Math.max(...batterie.slice(0, -1)) + '' + highestJoltageValue);
        } else {
          highestJoltage = parseInt(highestJoltageValue + '' + Math.max(...batterie.slice(batterie.indexOf(highestJoltageValue) + 1)));
        }
        return highestJoltage;
      })
      .reduce(this.arrayUtils.sum, 0);
  }

}
