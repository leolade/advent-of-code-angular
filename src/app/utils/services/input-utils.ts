import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputUtils {
  toNumberArray(s: string): number[] {
    return s.split('\n').map((s: string) => parseInt(s));
  }

  toString2DArray(s: string): string[][] {
    return s.split('\n').map((s: string) => s.split(''));
  }
}
