import { Routes } from '@angular/router';
import {day1Part12025Input} from "./2025/1/day1-part1-2025-input";
import {Day1Part12025} from "./2025/1/day1-part1-2025";
import {day1Part22025Input} from "./2025/1/day1-part2-2025-input";
import {Day1Part22025} from "./2025/1/day1-part2-2025";
import {PuzzlePart} from "./puzzle-day/puzzle-part.component";
import {PUZZLE_INPUT} from "./puzzle-day/puzzle-input";
import {SOLUTION_SERVICE} from "./puzzle-day/solution-service";
import {day4Part12025Input} from "./2025/4/day4-part1-2025-input";
import {Day4Part12025} from "./2025/4/day4-part1-2025";
import {day4Part22025Input} from "./2025/4/day4-part2-2025-input";
import {Day4Part22025} from "./2025/4/day4-part2-2025";



export const routes: Routes = [    {
        path: '2025/1/1',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day1Part12025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day1Part12025
        }]
    },
    {
        path: '2025/1/2',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day1Part22025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day1Part22025
        }]
    },
    {
        path: '2025/4/1',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day4Part12025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day4Part12025
        }]
    },
    {
        path: '2025/4/2',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day4Part22025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day4Part22025
        }]
    },
];
