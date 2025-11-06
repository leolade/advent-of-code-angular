import {Component} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {KeyValuePipe} from "@angular/common";
import {puzzledRegistred} from "../puzzle-registred";

@Component({
    selector: 'app-root',
    template: `
        <aside class="h-full">
            <ul class="menu bg-base-200 rounded-box w-56 h-full">
                <h1 class="menu-title">Advent of Code Hub</h1>
                @for (puzzlesByYear of puzzlesByYears | keyvalue; track puzzlesByYear.key) {
                    <li>
                        <details open>
                            <summary>{{ puzzlesByYear.key }}</summary>
                            <ul>
                                @for (puzzleDay of puzzlesByYear.value; track puzzleDay) {
                                    <li>
                                        <details open>
                                            <summary>{{ puzzleDay }}</summary>
                                            <ul>
                                                <li><a [routerLink]="[puzzlesByYear.key, puzzleDay, 1]">Part 1</a></li>
                                                <li><a [routerLink]="[puzzlesByYear.key, puzzleDay, 2]">Part 2</a></li>
                                            </ul>
                                        </details>
                                    </li>
                                }
                            </ul>
                        </details>
                    </li>
                }
            </ul>
        </aside>
        <main class="grow">
            <router-outlet></router-outlet>
        </main>
    `,
    host: {
        class: 'flex h-full'
    },
    standalone: true,
    imports: [RouterOutlet, KeyValuePipe, RouterLink]
})
export class App {
    name = 'Angular';

    puzzlesByYears = puzzledRegistred.reduce<Map<number, number[]>>(
        (acc: Map<number, number[]>, curr: { year: number, day: number }) => {
            if (!acc.has(curr.year)) {
                acc.set(curr.year, []);
            }
            acc.get(curr.year)?.push(curr.day);
            return acc;
        },
        new Map<number, number[]>()
    )
}
