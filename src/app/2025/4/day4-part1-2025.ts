import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";
import {Grid} from "./grid";

@Injectable()
export class Day4Part12025 extends Solution<string, number> {

    problemName = 'Printing Department - Part 1';

    protected override process(input: string): number {
        return new Grid(this.inputUtils.toString2DArray(input)).findRollsAccessedByForkLift();
    }

}
