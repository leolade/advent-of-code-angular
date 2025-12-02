import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ArrayUtils {

    sum(acc: number, curr: number): number {
        return acc + curr;
    }
}
