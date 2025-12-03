import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArrayUtils {

  sum(acc: number, curr: number): number {
    return acc + curr;
  }

  getMapOfOccurrences<T>(batterie: T[]) {
    const map = new Map<T, number>();
    batterie.forEach((item) => {
      if (map.has(item)) {
        map.set(item, (map.get(item) || 0) + 1);
      } else {
        map.set(item, 1);
      }
    });
    return map;
  }

  getOccurenceIndex<T>(values: T[], value: T, occurenceNumber: number) {
    let acc: number = 0;
    let lastIndex = -2;
    while (lastIndex !== -1 && acc < occurenceNumber) {
      lastIndex = values.indexOf(value, lastIndex + 1);
      acc += 1;
    }
    return lastIndex;
  }
}
