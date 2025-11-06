import {PuzzleDay} from "./puzzle-day/puzzle-day";
import {PUZZLE_INPUT} from "./puzzle-day/puzzle-input";
import {part1Day12024Input} from "./2024/1/part1-day1-2024-input";
import {SOLUTION_SERVICE} from "./puzzle-day/solution-service";
import {Part1Day12024} from "./2024/1/part1-day1-2024";
import {part2Day12024Input} from "./2024/1/part2-day1-2024-input";
import {Part2Day12024} from "./2024/1/part2-day1-2024";
import {Routes} from "@angular/router";
import {part1Day22024Input} from "./2024/2/part1-day2-2024-input";
import {Part1Day22024} from "./2024/2/part1-day2-2024";
import {part2Day22024Input} from "./2024/2/part2-day2-2024-input";
import {Part2Day22024} from "./2024/2/part2-day2-2024";


export const routes: Routes = [
    {
        path: '2024/1/1',
        component: PuzzleDay,
        providers: [{provide: PUZZLE_INPUT, useValue: part1Day12024Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Part1Day12024
        }]
    },
    {
        path: '2024/1/2',
        component: PuzzleDay,
        providers: [{provide: PUZZLE_INPUT, useValue: part2Day12024Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Part2Day12024
        }]
    },
    {
        path: '2024/2/1',
        component: PuzzleDay,
        providers: [{provide: PUZZLE_INPUT, useValue: part1Day22024Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Part1Day22024
        }]
    },
    {
        path: '2024/2/2',
        component: PuzzleDay,
        providers: [{provide: PUZZLE_INPUT, useValue: part2Day22024Input}, {
            provide: SOLUTION_SERVICE,
            useClass: Part2Day22024
        }]
    },
];
