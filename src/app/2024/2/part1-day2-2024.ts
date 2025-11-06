import { Injectable } from '@angular/core';
import {Solution} from "../../puzzle-day/solution";

@Injectable()
export class Part1Day22024 extends Solution<string, string> {
  override problemName: string = 'Red-Nosed Reports - Part 1';

    protected override process(input: string): string {
        return 'test';
    }

}
