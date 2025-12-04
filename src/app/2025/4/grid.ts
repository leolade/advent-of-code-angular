import {Coordinate} from "../../utils/models/coordinate";

export class Grid {

    constructor(
        public _data: string[][]
    ) {
    }

    findRollsAccessedByForkLift(): number {
        let acc: number = 0;
        this._data.forEach((row, y) => {
            row.forEach((mark, x) => {
                if (mark !== '@') {
                    return;
                }
                acc += (this.isAccessedByForkLift(x, y) ? 1 : 0);
            })
        });
        return acc;
    }

    private isAccessedByForkLift(x: number, y: number): boolean {
        return [
            (this._data[y] ?? [])[x - 1],
            (this._data[y - 1] ?? [])[x - 1],
            (this._data[y + 1] ?? [])[x - 1],
            (this._data[y] ?? [])[x + 1],
            (this._data[y - 1] ?? [])[x + 1],
            (this._data[y + 1] ?? [])[x + 1],
            (this._data[y + 1] ?? [])[x],
            (this._data[y - 1] ?? [])[x],
        ].filter((mark) => mark === '@').length < 4
    }
}
