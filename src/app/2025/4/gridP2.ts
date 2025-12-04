export class GridP2 {

    constructor(
        public _data: string[][]
    ) {
    }

    findRollsAccessedByForkLift(): [number, number][] {
        let acc: [number, number][] = [];
        this._data.forEach((row, y) => {
            row.forEach((mark, x) => {
                if (mark !== '@') {
                    return;
                }
                if (this.isAccessedByForkLift(x, y)) {
                    acc.push([y, x]);
                }
            })
        });
        return acc;
    }

    replaceRollsByNothing(rolls: [number, number][]): void {
        rolls.forEach(([y, x]) => this._data[y][x] = '.');
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

    public toString(): string {
        return this._data.map(row => row.join('')).join('\n');
    }
}
