export class Vault {

    currentPos = 50;
    clicking: number = 0;

    turn(direction: 'L' | 'R', amount: number): void {
        // On ajoute autant de click que de centaines complètes
        this.clicking += Math.trunc(amount / 100);

        // On s'occupe du reste
        let remaining = amount % 100;

        // Si il reste plus rien on termine
        if (remaining === 0) {
            return;
        }

        // On retient la position de départ
        const startPos = this.currentPos;

        if (direction === 'L') {
            // Si on tourne à gauche alors on soustrait
            const endPos = startPos - remaining;

            // Si on est passé en dessous de 0, on ajoute un click
            if (startPos !== 0 && endPos <= 0) {
                this.clicking += 1;
            }

            // La nouvelle position est le complément à 100.
            this.currentPos = endPos >= 0 ? endPos : (100 - Math.abs(endPos)) % 100;
        } else {
            // Si on tourne à droite on ajoute
            const endPos = startPos + remaining;

            // Si ca atteint 100 on click
            if (endPos >= 100) {
                this.clicking += 1;
            }

            // La nouvelle position est le reste du modulo 100
            this.currentPos = endPos % 100;
        }
    }
}
