// zmienic nazwe tej klasy na position czy cos lepszego
class Point {
    private _x: number;
    private _y: number;

    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public getX(): number {
        return this._x;
    }

    public setX(newX: number): void {
        this._x = newX;
    }

    public getY(): number {
        return this._y;
    }

    public setY(newY: number): void {
        this._y = newY;
    }

    public getPos(): number[] {
        return [this._x, this._y];
        // tu dac getX, getY
    }

    public equalPosition(other: Point): boolean {
        return this._x === other._x && this._y === other._y;
    }

    public add(other: Point): Point {
        let newX: number = this.getX() + other.getX();
        let newY: number = this.getY() + other.getY();
        return new Point(newX, newY);
    }
}

export default Point;
