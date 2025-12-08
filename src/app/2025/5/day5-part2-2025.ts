import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Day5Part22025 extends Solution<string, number> {

    problemName = 'Cafeteria - Part 2';

    protected override process(input: string): number {
        let ranges: [number, number][] = input.split('\n\n')[0]
            .split('\n')
            .map(range => [parseInt(range.split('-')[0]), parseInt(range.split('-')[1])])

        let merged: number = -1;
        while (merged !== 0) {
            console.log(ranges);
            merged = 0;
            ranges = ranges.reduce(
                (prev, current) => {
                    const rangeToMerge = prev.find(([min, max]) => {
                        return (current[0] >= min && current[0] <= max) || (current[1] >= min && current[1] <= max)
                    });

                    if (!rangeToMerge) {
                        prev.push(current);
                        return prev;
                    }

                    if ((current[0] >= rangeToMerge[0] && current[0] <= rangeToMerge[1]) && (current[1] >= rangeToMerge[0] && current[1] <= rangeToMerge[1])) {
                        return prev;
                    } else if (current[0] >= rangeToMerge[0] && current[0] <= rangeToMerge[1]) {
                        rangeToMerge[1] = current[1];
                    } else {
                        rangeToMerge[0] = current[0];
                    }
                    merged +=1;
                    return prev;
                },
                [] as [number, number][],
            )
        }
        return ranges.reduce((acc, [min, max]) => acc + (max - min + 1), 0);
    }

}
