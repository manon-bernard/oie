import Square from './Square.js';

export default class Board {
  constructor(numberTiles) {
    this.numberTiles = numberTiles;
  }

  render() {
    const board = document.querySelector('.board-grid');

    for (let i = 0; i < this.numberTiles; i++) {
      let square = new Square(i);
      board.appendChild(square.render());
    }
  }
}
