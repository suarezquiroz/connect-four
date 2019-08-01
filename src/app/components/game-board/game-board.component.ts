import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'c4-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  private n = 4;
  columns = 7;
  rows = 6;
  currentColor = 'red';
  winner = '';
  started = false;

  @Input()
  get size(): number {
    return this.n;
  }
  set size(size: number) {
    this.n = size;
    this.columns = 2 * size + 1;
    this.rows = size + 2;
  }

  board: string[][];

  @ViewChild('boardElement')
  boardElement: ElementRef<HTMLElement>;
  @ViewChild('cursor')
  cursor: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {

    // generate matrix
    this.restart();

    this.boardElement.nativeElement.addEventListener('mousemove', event => {
      this.cursor.nativeElement.setAttribute(
          'style',
          `display: block;
          background-color: ${this.currentColor};
          top: ${event.pageY - 25}px;
          left: ${event.pageX - 25}px`
        );
    });

  }

  addDisc(column: number) {
    this.started = true;
    const emptySlot = this.board[column].lastIndexOf('unset');
    if (emptySlot !== -1) {
      this.board[column][emptySlot] = this.currentColor;
      this.checkConnect4();
      this.switchColor();
    }
  }

  switchColor() {
    if (this.currentColor === 'red') {
      this.currentColor = 'yellow';
    } else {
      this.currentColor = 'red';
    }
  }

  checkConnect4() {
    let matches = 0;
    const colorLayer = this.board.map(column => column.map(slot => slot === this.currentColor).reverse());

    const checkDirection = (posX: number, posY: number, dirX: number, dirY: number) => {
      if (colorLayer[posX + dirX] && colorLayer[posX + dirX][posY + dirY] === true) {
        matches++;
        if (matches >= this.n) {
          return true;
        } else {
          return checkDirection(posX + dirX, posY + dirY, dirX, dirY);
        }
      } else {
        matches = 1;
        return false;
      }
    };

    for (let col = 0; col < colorLayer.length; col++) {
      const column = colorLayer[col];
      for (let row = 0; row < column.length; row++) {
        const slot = column[row];
        if (slot) {
          matches = 1;

          if (
            // check left
            checkDirection(col, row, -1, 0) ||
            // check down left
            checkDirection(col, row, -1, 1) ||
            // check down
            checkDirection(col, row, 0, 1) ||
            // check down right
            checkDirection(col, row, 1, 1) ||
            // check right
            checkDirection(col, row, 1, 0)
          ) {
            this.winner = this.currentColor;
            break;
          }
        }
      }
      if (this.winner) {
        break;
      }
    }

  }

    // 2N-1 x N+2 board, 5N+1 piece, 4 <= N <= 10
  restart() {
    this.board = (new Array(2 * this.n - 1)).fill([]);
    this.board = this.board.map( column => {
      return (new Array(+this.n + 2).fill('unset'));
    });

    this.started = false;
    this.winner = '';
  }
}
