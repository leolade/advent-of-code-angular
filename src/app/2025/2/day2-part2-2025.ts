import {inject, Injectable} from '@angular/core';
import {Solution} from "../../puzzle-day/solution";
import {ArrayUtils} from "../../utils/services/array-utils";
import {ProductRangeP2} from "./ProductRangeP2";

@Injectable()
export class Day2Part22025 extends Solution<string, number> {

    arrayUtils: ArrayUtils = inject(ArrayUtils);

    problemName = 'Gift Shop - Part 2';

    protected override process(input: string): number {
        const invalidIds = input.split(',')
            .map(range => new ProductRangeP2(parseInt(range.split('-')[0]), parseInt(range.split('-')[1])))
            .map(range => range.getInvalidIds())
        return invalidIds
            .flatMap(ids => ids)
            .reduce(this.arrayUtils.sum, 0);
    }

}
