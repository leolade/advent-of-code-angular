import {Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Day1Part12025 extends Solution<string, number> {

    problemName = 'Secret Entrance - Part 1';

    protected override process(input: string): number {
        return this.inputUtils.toStringArray(input)
            .reduce<[number, number]>(([currentPos, nbOf0]: [number, number], line: string) => {
                let numberPart = parseInt(line.substring(1)) % 100;
                if (line.startsWith('L')) {
                    numberPart = 100 - numberPart;
                }
                const newPos = Math.abs(currentPos + numberPart) % 100;
                return [newPos, nbOf0 + (newPos === 0 ? 1 : 0)];
            }, [50, 0])[1];
    }

}
