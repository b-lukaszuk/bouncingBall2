import board from './examInput';
import Point from '../point/point';
import Ball from '../point/ball';
import Brick from '../point/brick';
import MagicBrick from '../point/magicBrick';
import isBetween from '../utils/betweenTwoNums';

class GameBoard {

    private _gameBoard: Point[][] = [];
    private _ball: Ball = new Ball(0, 0);

    constructor() {
        this.initializeBoard();
    }

    private boardTranslateSymbolToObject(row: number, col: number): Point {
        if (board[row][col] === 'X') {
            return new Brick(
                row,
                col,
                this.shouldLimitOnAxis([row, col], true),
                this.shouldLimitOnAxis([row, col], false)
            );
        } else if (board[row][col] === '1') {
            return new Ball(row, col);
        } else if (board[row][col] === 'Y') {
            return new MagicBrick(row, col);
        } else {
            return new Point(row, col);
        }
    }

    // initialize board with the required in the task pattern
    public initializeBoard(): void {
        this._gameBoard = [];

        for (let r = 0; r < this.getNRows(); r++) {
            let row: Point[] = [];
            for (let c = 0; c < this.getNCols(); c++) {
                let theObject: Point = this.boardTranslateSymbolToObject(r, c);
                if (theObject instanceof Ball) {
                    this._ball = theObject;
                }
                row.push(theObject);
            }
            this._gameBoard.push(row);
        }
    }

    private laysOnEdge(pos: number[], xAxis: boolean): boolean {
        let upperEdge: number;
        upperEdge = xAxis ? (this.getNRows() - 1) : (this.getNCols() - 1);
        let toCompare: number = pos[xAxis ? 0 : 1];
        return toCompare === 0 || toCompare === upperEdge;
    }

    private shouldLimitOnAxis(curBrickPos: number[], xAxis: boolean): boolean {
        let neighboursWithBrickOnAxis: boolean = false;
        if (this.laysOnEdge(curBrickPos, xAxis)) {
            return true;
        } else if (!this.laysOnEdge(curBrickPos, !xAxis)) {
            neighboursWithBrickOnAxis = this.isBrickOneStepOnAxis(
                curBrickPos, xAxis);
            if (neighboursWithBrickOnAxis) {
                return true;
            }
        }
        return false;
    }

    private getNeighboursOnAxis(
        curBrickPos: number[], xAxis: boolean): string[] {

        let [cX, cY] = curBrickPos;
        let minusOneField: string, plusOneField: string;

        if (xAxis) {
            minusOneField = board[cX - 1][cY];
            plusOneField = board[cX + 1][cY];
        } else {
            minusOneField = board[cX][cY - 1];
            plusOneField = board[cX][cY + 1];
        }

        return [minusOneField, plusOneField];
    }

    private isBrickOneStepOnAxis(
        curBrickPos: number[], xAxis: boolean): boolean {

        let neighbours: string[] = this.getNeighboursOnAxis(curBrickPos, xAxis);
        let gotBrickOnMinusOne: boolean = false;
        let gotBrickOnPlusOne: boolean = false;

        if (
            isBetween(
                curBrickPos[xAxis ? 0 : 1],
                1,
                xAxis ? (this.getNRows() - 2) : (this.getNCols() - 2)
            )
        ) {
            gotBrickOnMinusOne = (neighbours[0] === 'X');
            gotBrickOnPlusOne = (neighbours[1] === 'X');
        }

        return gotBrickOnMinusOne || gotBrickOnPlusOne;
    }

    public getGameBoard(): Point[][] {
        return this._gameBoard;
    }

    public getBall(): Ball {
        return this._ball;
    }

    /**
     * gets obj (Point) coordinates and sets it there at this._gameBoard
     */
    public setObjAtBoard(obj: Point): void {
        let [row, col] = obj.getPos();
        if (obj instanceof Ball) {
            this._ball = obj;
        }
        this._gameBoard[row][col] = obj;
    }

    public getContent(pos: number[]): Point {
        let [row, col] = pos;
        return this._gameBoard[row][col];
    }

    public getNCols(): number {
        // all rows are of equal length
        return board[0].length;
    }

    public getNRows(): number {
        return board.length;
    }
}

const singelton = (function() {
    let instance: GameBoard; // no initialization so undefined

    function init() {
        return new GameBoard();
    }

    function getInstance(): GameBoard {
        if (!Boolean(instance)) {
            instance = init();
        }
        return instance;
    }

    return {
        getGameBoardInstance: getInstance,
    };
})();

export { GameBoard, singelton };
