export class Vault {

    currentPos = 50;
    clicking: number = 0;

    turn(direction: 'L' | 'R', amount: number): void {
        this.clicking += Math.trunc(amount / 100);
        let remaining = amount % 100;
        const startPos = this.currentPos;
        if (direction === 'L') {
            const endPos = startPos - remaining;
            if (startPos !== 0 && endPos <= 0) {
                this.clicking += 1;
            }
            this.currentPos = (100 - Math.abs(endPos)) % 100;
        } else {
            const endPos = startPos + remaining;
            if (endPos > 100) {
                this.clicking += 1;
            }
            this.currentPos = endPos % 100;
        }
    }
}
