import {Component, inject, signal, WritableSignal} from '@angular/core';
import {SOLUTION_SERVICE} from "./solution-service";
import {Solution} from "./solution";

@Component({
    selector: 'app-puzzle-day',
    imports: [],
    templateUrl: './puzzle-day.html',
    styleUrls: ['./puzzle-day.css'],
    host: {'class': 'flex grow h-full items-center justify-center'},
})
export class PuzzleDay {
    solution: Solution = inject(SOLUTION_SERVICE);
    dureeExecution: WritableSignal<number> = signal(-1);
    results: WritableSignal<string> = signal('Résultats en cours de calcul...');

    constructor() {
        const debut = new Date();
        this.results.set(this.solution.generateResult());
        this.dureeExecution.set(new Date().getTime() - debut.getTime());
    }
}
