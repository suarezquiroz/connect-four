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
      ['none', 'none', 'none', 'none', 'none', 'red', 'red'],
      ['none', 'none', 'none', 'none', 'none', 'red', 'yellow'],
      ['none', 'none', 'none', 'none', 'none', 'red', 'yellow'],
      ['none', 'none', 'none', 'none', 'none', 'yellow', 'red'],
      ['none', 'none', 'none', 'none', 'none', 'yellow', 'red'],
      ['none', 'none', 'none', 'none', 'none', 'red', 'yellow']
    ];
    console.log('this.board', this.board);

  }

  addDisc(column: number, color: string) {

  }

}
