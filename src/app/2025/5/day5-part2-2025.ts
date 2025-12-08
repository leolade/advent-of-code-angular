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
                    const valeurMinimaleTrancheEnCours = current[0];
                    const valeurMaximaleTrancheEnCours = current[1];
                    const rangeToMerge = prev.find(([valeurMinTrancheIterator, valeurMaxTrancheIterator]) => {
                        let isBetween = [
                            this.isBeteween(valeurMinimaleTrancheEnCours, valeurMinTrancheIterator, valeurMaxTrancheIterator),
                            this.isBeteween(valeurMaximaleTrancheEnCours, valeurMinTrancheIterator, valeurMaxTrancheIterator)
                        ];

                        if (isBetween.some((b) => b)) {
                            return true;
                        }

                        isBetween = [
                            this.isBeteween(valeurMinTrancheIterator, valeurMinimaleTrancheEnCours, valeurMaximaleTrancheEnCours),
                            this.isBeteween(valeurMaxTrancheIterator, valeurMinimaleTrancheEnCours, valeurMaximaleTrancheEnCours)
                        ];

                        if (isBetween.some((b) => b)) {
                            return true;
                        }

                        return false;
                    });

                    if (!rangeToMerge) {
                        prev.push(current);
                        return prev;
                    }

                    const valeurMinimaleTrancheAMerger = rangeToMerge[0];
                    const valeurMaximaleTrancheAMerger = rangeToMerge[1];
                    rangeToMerge[0] = Math.min(valeurMinimaleTrancheEnCours, valeurMinimaleTrancheAMerger);
                    rangeToMerge[1] = Math.max(valeurMaximaleTrancheEnCours, valeurMaximaleTrancheAMerger);

                    merged +=1;
                    return prev;
                },
                [] as [number, number][],
            )
        }
        return ranges.reduce((acc, [min, max]) => acc + (max - min + 1), 0);
    }

    isBeteween(v: number, vmin: number, vmax: number) {
        return v >= vmin && v <= vmax;
    }

}
