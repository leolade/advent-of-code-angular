import {Vault} from "./vault";

describe('day1Part22025', () => {

    it('should turn r 50 no click', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("R", 50);

        expect(v.currentPos).toBe(50);
        expect(v.clicking).toBe(0);
    });

    it('should turn L 50 no click', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("L", 50);

        expect(v.currentPos).toBe(50);
        expect(v.clicking).toBe(0);
    });

    it('should turn L 150 click once', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("L", 150);

        expect(v.currentPos).toBe(50);
        expect(v.clicking).toBe(1);
    });

    it('should turn R 150 click once', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("R", 150);

        expect(v.currentPos).toBe(50);
        expect(v.clicking).toBe(1);
    });

    it('should turn L 1150 click 11', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("L", 1150);

        expect(v.currentPos).toBe(50);
        expect(v.clicking).toBe(11);
    });

    it('should turn R 1150 click 11', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("R", 1150);

        expect(v.currentPos).toBe(50);
        expect(v.clicking).toBe(11);
    });

    it('should turn r 50 no click', () => {
        const v = new Vault();
        v.currentPos = 25;
        v.turn("R", 50);

        expect(v.currentPos).toBe(75);
        expect(v.clicking).toBe(0);
    });

    it('should turn L 50 no click', () => {
        const v = new Vault();
        v.currentPos = 25;
        v.turn("L", 50);

        expect(v.currentPos).toBe(75);
        expect(v.clicking).toBe(1);
    });

    it('should turn L 150 click once', () => {
        const v = new Vault();
        v.currentPos = 25;
        v.turn("L", 150);

        expect(v.currentPos).toBe(75);
        expect(v.clicking).toBe(2);
    });

    it('should turn R 150 click once', () => {
        const v = new Vault();
        v.currentPos = 25;
        v.turn("R", 150);

        expect(v.currentPos).toBe(75);
        expect(v.clicking).toBe(1);
    });

    it('should turn L 1150 click 11', () => {
        const v = new Vault();
        v.currentPos = 25;
        v.turn("L", 1150);

        expect(v.currentPos).toBe(75);
        expect(v.clicking).toBe(12);
    });

    it('should turn R 1150 click 11', () => {
        const v = new Vault();
        v.currentPos = 25;
        v.turn("R", 1150);

        expect(v.currentPos).toBe(75);
        expect(v.clicking).toBe(11);
    });

    it('should turn r 50 no click', () => {
        const v = new Vault();
        v.currentPos = 50;
        v.turn("R", 50);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(0);
    });

    it('should turn L 50 no click', () => {
        const v = new Vault();
        v.currentPos = 50;
        v.turn("L", 50);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(1);
    });

    it('should turn L 150 click once', () => {
        const v = new Vault();
        v.currentPos = 50;
        v.turn("L", 150);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(2);
    });

    it('should turn R 150 click once', () => {
        const v = new Vault();
        v.currentPos = 50;
        v.turn("R", 150);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(1);
    });

    it('should turn L 1150 click 11', () => {
        const v = new Vault();
        v.currentPos = 50;
        v.turn("L", 1150);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(12);
    });

    it('should turn R 1150 click 11', () => {
        const v = new Vault();
        v.currentPos = 50;
        v.turn("R", 1150);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(11);
    });

    it('should turn R 100 click 1', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("R", 100);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(1);
    });

    it('should turn L 100 click 1', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("L", 100);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(1);
    });

    it('should turn R 1000 click 10', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("R", 1000);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(10);
    });

    it('should turn L 1000 click 10', () => {
        const v = new Vault();
        v.currentPos = 0;
        v.turn("L", 1000);

        expect(v.currentPos).toBe(0);
        expect(v.clicking).toBe(10);
    });
});
