import Point from "./point";

class Brick extends Point {

    _limitX: boolean;
    _limitY: boolean;

    public constructor(x: number, y: number,
        limitX: boolean, limitY: boolean) {
        super(x, y);
        this._limitX = limitX;
        this._limitY = limitY;
    }

    public add(shift: Point): Point {
        let newX: number, newY: number;
        newX = this._limitX ? (shift.getX() * -1) : shift.getX();
        newY = this._limitY ? (shift.getY() * -1) : shift.getY();
        return new Point(newX, newY);
    }
}

export default Brick;
