import { Component } from '@angular/core';

// GameBoard imported for autocompletion and typechecking
import { singelton, GameBoard } from './gameBoard/gameBoard';
import Point from './point/point';
import Ball from './point/ball';
import Brick from './point/brick';
import MagicBrick from './point/magicBrick';
import randInt from "./utils/randInt"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title: string = 'bouncing-ball';
    public gameBoard: GameBoard = singelton.getGameBoardInstance();
    public shift: Point = new Point(1, 1);
    public initialBall: Ball = this.gameBoard.getBall();
    public intervalId: any;
    public shouldBallBeStopped: boolean = false;
    public gameStarted: boolean = false;

    public getClassForField(pos: number[]): string {
        if (this.gameBoard.getContent(pos) instanceof MagicBrick) {
            return 'magicBrick';
        } else if (this.gameBoard.getContent(pos) instanceof Brick) {
            return 'boarder';
        } else if (this.gameBoard.getContent(pos) instanceof Ball) {
            return 'ball';
        } else {
            return 'empty';
        }
    }

    public changeShift(option: number): void {
        switch (option) {
            case 1:
                this.shift = new Point(-1, -1);
                break;
            case 2:
                this.shift = new Point(-1, 1);
                break;
            case 3:
                this.shift = new Point(1, -1);
                break;
            default:
                this.shift = new Point(1, 1);
                break;
        }
    }

    private changeShiftIfCollision(newBall: Ball) {
        let gotoField: Point = this.gameBoard.getContent(
            newBall.getPos());
        if (gotoField instanceof Brick) {
            this.shift = gotoField.add(this.shift);
        }
    }

    public moveBallByOneField(): void {
        let curBall: Ball = this.gameBoard.getBall();
        let [bRow, bCol] = curBall.getPos();
        let newBall: Ball; // where ball will be in the next move

        do {
            newBall = curBall.add(this.shift);
            this.changeShiftIfCollision(newBall);
        } while (this.gameBoard.getContent(newBall.getPos()) instanceof Brick)

        this.gameBoard.setObjAtBoard(new Point(bRow, bCol));
        this.gameBoard.setObjAtBoard(newBall);

        this.shouldBallBeStopped = newBall.equalPosition(this.initialBall);
    }

    // public indexOfVector(vector: number[], arrOfVects: number[][]): number {

    public initializeGameBoard(): void {
        this.gameBoard.initializeBoard();
    }


    private getBallAtWithItsXYRandom(): Ball {
        let newX: number = randInt(1, this.gameBoard.getNRows() - 1);
        let newY: number = randInt(1, this.gameBoard.getNCols() - 1);
        return new Ball(newX, newY);
    }

    public setStartingBallAtRandomPosition() {
        let curBall: Ball = this.gameBoard.getBall();
        let newBall: Ball;
        do {
            newBall = this.getBallAtWithItsXYRandom();
        } while (this.gameBoard.getContent(newBall.getPos()) instanceof Brick)
        this.gameBoard.setObjAtBoard(new Point(curBall.getX(), curBall.getY()));
        this.gameBoard.setObjAtBoard(newBall);
        this.initialBall = newBall;
    }

    /**
     * sets ball into motion
     * sets this.internalId = to interval id from setInterval
     * that it uses internally
     */
    public setBallIntoMotion() {
        let intervalId = setInterval(() => {
            this.gameStarted = true;
            this.moveBallByOneField();
            if (this.shouldBallBeStopped) {
                this.stopTheBall();
            }
        }, 200);
        this.intervalId = intervalId;
    }

    public stopTheBall() {
        clearInterval(this.intervalId);
    }

    ngOnInit() {
    }
}
