// Imports

// Player
export default class Player {
  constructor(playerNumber, color) {
    this.name = `Joueur ${playerNumber}`;
    this.color = color;
    this.currentPosition = 0;
    this.previousPosition = 0;
    this.waiting = 0;
    this.locked = false;
  }

  render() {
    const startSquare = document.querySelector('#case-0');
    const playerAsset = document.createElement('img');
    playerAsset.src = `../assets/images/oie-${this.color}.svg`;
    playerAsset.alt = `${this.color} player token`;
    playerAsset.id = this.name;
    startSquare.prepend(playerAsset);
  }
}
