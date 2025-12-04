export class ProductRange {

    constructor(public min: number, public max: number) {
    }

    getInvalidIds(): number[] {
        return this.getIds()
            .map(id => id + '')
            .filter((id: string) => (id.length % 2) === 0 && id.substring(0, id.length / 2) === id.substring(id.length / 2))
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
}
