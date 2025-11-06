import { Injectable } from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Part2Day22024 extends Solution<string, string> {
    override problemName: string = 'Red-Nosed Reports - Part 2';

    protected override process(input: string): string {
        throw new Error("Method not implemented.");
    }

}
