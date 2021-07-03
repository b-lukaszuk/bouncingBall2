import Point from "./point";

class Ball extends Point {

    public constructor(x: number, y: number) {
        super(x, y);
    }

    public add(other: Point): Ball {
        let newX: number = this.getX() + other.getX();
        let newY: number = this.getY() + other.getY();
        return new Ball(newX, newY);
    }
}

export default Ball;
