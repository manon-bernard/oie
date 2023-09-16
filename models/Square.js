export default class Square {
  constructor(caseNumber, role) {
    this.caseNumber = caseNumber;
  }

  // Method used to render a square
  render() {
    const squareEl = document.createElement('div');
    squareEl.id = `case-${this.caseNumber}`;
    squareEl.className = 'case';
    const squareNumber = document.createElement('span');
    squareNumber.textContent = this.caseNumber;
    squareEl.appendChild(squareNumber);
    return squareEl;
  }
}
