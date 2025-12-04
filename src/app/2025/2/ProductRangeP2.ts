export class ProductRangeP2 {

    constructor(public min: number, public max: number) {
    }

    getInvalidIds(): number[] {
        return this.getIds()
            .map(id => id + '')
            .filter((id: string) => {
                let patternLength = Math.trunc(id.length / 2);
                while (patternLength > 0) {
                    if (this.isPattern(id, patternLength)) {
                        return true;
                    }
                    patternLength -= 1;
                }
                return false;
            })
            .map(id => parseInt(id));
    }

    getIds(): number[] {
        const res: number[] = []
        let cursor: number = this.min;
        while (cursor <= this.max) {
            res.push(cursor);
            cursor += 1;
        }
        return res;
    }

    private isPattern(id: string, patternLength: number): boolean {
        if ((id.length / patternLength) % 1 !== 0) {
            return false;
        }
        const regex = new RegExp(`[0-9]{${patternLength}}`, 'g')
        const idParts: RegExpMatchArray | null = id.match(regex);
        if (idParts === null) {
            return false;
        }
        return idParts.every(part => part === idParts[0]);
    }
}
