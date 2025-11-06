import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Part2Day12024 extends Solution<[number, number][], number> {

  problemName: string = 'Historian Hysteria - Part 2';

  protected override process(input: [number, number][]): number {
    // Split input in two array : left and right
    const leftList: number[] = [];
    const rightList: number[] = [];
    input.forEach(([left, right]: [number, number]) => {
      leftList.push(left);
      rightList.push(right);
    });

    // Get similarity scores for right values
    const similarityScores: {[key in number]: number} = rightList.reduce<{[key in number]: number}>((prev, curr: number) => {
      prev[curr] = curr + (prev[curr] ?? 0);
      return prev;
    }, {});

    // Iterate over left list to get similarity scores and sum them
    return leftList.map((value: number) => {
      return similarityScores[value] ?? 0;
    }).reduce((prev, curr) => prev + curr, 0);
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
