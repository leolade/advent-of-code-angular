import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Part1Day12024 extends Solution<[number, number][], number> {

  problemName: string = 'Historian Hysteria - Part 1';

  protected override process(input: [number, number][]): number {
    // Split input in two array : left and right
    const leftList: number[] = [];
    const rightList: number[] = [];
    input.forEach(([left, right]: [number, number]) => {
      leftList.push(left);
      rightList.push(right);
    });

    // Sort arrays
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    // Get distances
    const distances: number[] = leftList.map((leftValue: number, index: number) => {
      const rightValue: number = rightList[index];
      return Math.abs(leftValue - rightValue);
    });

    // Sum
    return distances.reduce((previousValue: number, currentValue: number) => {
      return previousValue + currentValue
    }, 0);
  }

  protected override transform(rawInput: string): [number, number][] {
    return rawInput.split('\n')
      .map((line: string) => {
        const parts: string[] = line.split('   ');
        if (parts.length !== 2) {
          throw new Error('Bad input or parsing');
        }
        return parts.map((part: string) => parseInt(part.trim())) as [number, number]
      });
  }

}
