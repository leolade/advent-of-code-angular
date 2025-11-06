import { Injectable } from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Part2Day12024 extends Solution<string, string> {

    protected override process(input: string): string {
        return 'Merry Christmas!';
    }
  
}
