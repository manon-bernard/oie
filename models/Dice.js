// Imports

// Dice
export default class Dice {
  constructor(diceNumber) {
    this.name = diceNumber;
    this.value = 1;
  }

  render() {
    const diceTrack = document.querySelector('.track');
    const dice = document.createElement('div');
    dice.className = 'dice one';
    dice.id = `dice-${this.name}`;
    diceTrack.appendChild(dice);
  }

  rollAndRender() {
    this.value = Math.round(Math.random() * 5 + 1);

    const element = document.querySelector(`#dice-${this.name}`);

    element.classList.remove('one', 'two', 'three', 'four', 'five', 'six');

    if (this.value === 1) {
      element.classList.add('one');
    } else if (this.value === 2) {
      element.classList.add('two');
    } else if (this.value === 3) {
      element.classList.add('three');
    } else if (this.value === 4) {
      element.classList.add('four');
    } else if (this.value === 5) {
      element.classList.add('five');
    } else {
      element.classList.add('six');
    }

    return this.value;
  }
}
