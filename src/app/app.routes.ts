import { Routes } from '@angular/router';
import {day1Part12025Input} from "./2025/1/day1-part1-2025-input";
import {Day1Part12025} from "./2025/1/day1-part1-2025";
import {day1Part22025Input} from "./2025/1/day1-part2-2025-input";
import {Day1Part22025} from "./2025/1/day1-part2-2025";
import {PuzzlePart} from "./puzzle-day/puzzle-part.component";
import {PUZZLE_INPUT} from "./puzzle-day/puzzle-input";
import {SOLUTION_SERVICE} from "./puzzle-day/solution-service";
import {day2Part12025Input} from "./2025/2/day2-part1-2025-input";
import {Day2Part12025} from "./2025/2/day2-part1-2025";
import {day2Part22025Input} from "./2025/2/day2-part2-2025-input";
import {Day2Part22025} from "./2025/2/day2-part2-2025";
import {day3Part12025Input} from "./2025/3/day3-part1-2025-input";
import {Day3Part12025} from "./2025/3/day3-part1-2025";
import {day3Part22025Input} from "./2025/3/day3-part2-2025-input";
import {Day3Part22025} from "./2025/3/day3-part2-2025";




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
        path: '2025/2/1',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day2Part12025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day2Part12025
        }]
    },
    {
        path: '2025/2/2',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day2Part22025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day2Part22025
        }]
    },
    {
        path: '2025/3/1',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day3Part12025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day3Part12025
        }]
    },
    {
        path: '2025/3/2',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day3Part22025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day3Part22025
        }]
    },
];
