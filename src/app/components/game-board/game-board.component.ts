import { Component, OnInit, Input } from '@angular/core';

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

  @Input()
  get size(): number {
    // transform value for display
    return this.n;
  }
  set size(size: number) {
    this.n = size;
    this.columns = 2 * size + 1;
    this.rows = size + 2;
  }
  board: string[][];

  constructor() { }

  ngOnInit() {

    // generate matrix
    // 2N-1 x N+2 board, 5N+1 piece, 4 <= N <= 10
    this.board = [
      ['none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none'],
      ['none', 'none', 'none', 'none', 'none', 'none']
    ];

  }

  addDisc(column: number, color: string) {
    const emptySlot = this.board[column].lastIndexOf('none');
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
            console.log('colorLayer', colorLayer);
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

}
