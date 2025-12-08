import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Day5Part12025 extends Solution<string, number> {

    problemName = 'Cafeteria - Part 1';

    protected override process(input: string): number {
        const ranges: [number, number][] = input.split('\n\n')[0]
            .split('\n')
            .map(range => [parseInt(range.split('-')[0]), parseInt(range.split('-')[1])]);

        const ids: number[] = input.split('\n\n')[1].split('\n').map(id => parseInt(id));

        return ids.filter(id => ranges.some(([min, max]) => id >= min && id <= max)).length;
    }

}
