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
import {day4Part12025Input} from "./2025/4/day4-part1-2025-input";
import {Day4Part12025} from "./2025/4/day4-part1-2025";
import {day4Part22025Input} from "./2025/4/day4-part2-2025-input";
import {Day4Part22025} from "./2025/4/day4-part2-2025";
import {day5Part12025Input} from "./2025/5/day5-part1-2025-input";
import {Day5Part12025} from "./2025/5/day5-part1-2025";
import {day5Part22025Input} from "./2025/5/day5-part2-2025-input";
import {Day5Part22025} from "./2025/5/day5-part2-2025";





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
    {
        path: '2025/5/1',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day5Part12025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day5Part12025
        }]
    },
    {
        path: '2025/5/2',
        component: PuzzlePart,
        providers: [{provide: PUZZLE_INPUT, useValue: day5Part22025Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Day5Part22025
        }]
    },
];
