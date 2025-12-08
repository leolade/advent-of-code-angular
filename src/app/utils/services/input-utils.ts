import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputUtils {
  toNumberArray(s: string): number[] {
    return s.split('\n').map((s: string) => parseInt(s));
  }

  toStringArray(s: string): string[] {
    return s.split('\n');
  }

  splitByWhitespaces(s: string): string[] {
    return s.match(/\S+/g) || [];
  }

  toString2DArray(s: string): string[][] {
    return this.toStringArray(s).map((s: string) => s.split(''));
  }

  toNumber2DArray(s: string): number[][] {
    return this.toStringArray(s).map((s: string) => s.split('').map((s: string) => parseInt(s)));
  }
}
