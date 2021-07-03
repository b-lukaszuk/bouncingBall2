import Point from "./point";
import randInt from "../utils/randInt";
import Brick from './brick';
import logicalXor from '../utils/logicalXor';

class MagicBrick extends Brick {

    public constructor(x: number, y: number) {
        super(x, y, false, false);
    }

    public add(shift: Point): Point {
        let negateX: boolean, negateY: boolean;
        let newX: number = shift.getX(), newY: number = shift.getY();
        do {
            negateX = randInt(2) === 1 ? true : false;
            negateY = randInt(2) === 1 ? true : false;
        } while (!logicalXor(negateX, negateY))
        newX = negateX ? (newX * -1) : newX;
        newY = negateY ? (newY * -1) : newY;
        return new Point(newX, newY);
    }
}

export default MagicBrick;
