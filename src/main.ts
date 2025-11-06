import { Component, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, RouterOutlet, RouterLink } from '@angular/router';
import { PuzzleDay } from './app/puzzle-day/puzzle-day';



@Component({
  selector: 'app-root',
  template: `
    <h1>Advent of Code Hub</h1>
    <nav>
      <a routerLink="/2024">2024</a> |
      <a routerLink="/2024/day-1">2024 Day 1</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet, RouterLink]
})
export class App {
  name = 'Angular';
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '2024',
    pathMatch: 'full'
  },
  {
    path: '2024',
    children: [
      { path: '', component: PuzzleDay },
      { path: 'day-1', component: PuzzleDay }
    ]
  }
];

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ],
});
