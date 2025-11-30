import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringUtils {
  getAllCharIndexes(str: string, char: string): number[] {
    const indexes: number[] = [];
    let currentIndex = str.indexOf(char);
    while (currentIndex !== -1) {
      indexes.push(currentIndex);
      currentIndex = str.indexOf(char, currentIndex + 1);
    }
    return indexes;
  }
}
