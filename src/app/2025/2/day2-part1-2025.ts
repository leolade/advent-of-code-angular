import {inject, Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";
import {ProductRange} from "./ProductRange";
import {ArrayUtils} from "../../utils/services/array-utils";

@Injectable()
export class Day2Part12025 extends Solution<string, number> {

    arrayUtils: ArrayUtils = inject(ArrayUtils);

    problemName = 'Gift Shop - Part 1';

    protected override process(input: string): number {
        return input.split(',')
            .map(range => new ProductRange(parseInt(range.split('-')[0]), parseInt(range.split('-')[1])))
            .map(range => range.getInvalidIds())
            .flatMap(ids => ids)
            .reduce(this.arrayUtils.sum, 0);
    }

}
