import { Component, inject, signal, WritableSignal } from '@angular/core';
import { SOLUTION_SERVICE } from './solution-service';
import { Solution } from './solution';

@Component({
  selector: 'app-puzzle-day',
  imports: [],
  templateUrl: './puzzle-part.component.html',
  styleUrls: ['./puzzle-part.component.css'],
  host: { class: 'flex flex-col grow h-full items-center justify-center' },
})
export class PuzzlePart {
  solution: Solution = inject(SOLUTION_SERVICE);
  dureeExecution: WritableSignal<number> = signal(-1);
  results: WritableSignal<unknown> = signal(undefined);

  constructor() {
    const debut = new Date();
    this.solution.generateResult().subscribe((res) => {
      this.results.set(res);
      this.dureeExecution.set(new Date().getTime() - debut.getTime());
    });
  }
}
