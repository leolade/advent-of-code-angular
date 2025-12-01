import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";
import {Vault} from "./vault";

@Injectable()
export class Day1Part22025 extends Solution<string, number> {

    problemName = 'Secret Entrance - Part 2';

    protected override process(input: string): number {
        const v = new Vault();

        this.inputUtils.toStringArray(input)
            .forEach((line: string) => v.turn(line.startsWith('L') ? "L" : "R", parseInt(line.substring(1))));

        return v.clicking;
    }

}
