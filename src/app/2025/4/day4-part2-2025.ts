import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";
import {GridP2} from "./gridP2";

@Injectable()
export class Day4Part22025 extends Solution<string, number> {

    problemName = 'Printing Department - Part 1';

    protected override process(input: string): number {
        let acc: number = 0;
        let newRollsRemovedNb = -1;
        const grid = new GridP2(this.inputUtils.toString2DArray(input));
        while (newRollsRemovedNb !== 0) {
            const newRollsRemoved = grid.findRollsAccessedByForkLift();
            newRollsRemovedNb = newRollsRemoved.length;
            if (newRollsRemovedNb) {
                grid.replaceRollsByNothing(newRollsRemoved);
            }
            acc += newRollsRemovedNb;
        }
        return acc;
    }
}
