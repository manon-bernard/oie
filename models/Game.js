// Imports
import Board from './Board.js';
import Player from './Player.js';
import Dice from './Dice.js';

// Game
export default class Game {
  constructor() {
    this.playerOne = new Player('1', 'blue');
    this.playerTwo = new Player('2', 'red');
    this.diceOne = new Dice(1);
    this.diceTwo = new Dice(2);
    this.activePlayer = 'Joueur 1';
    this.dicesResult = '';
    this.message = '';
  }

  // Event Listeners
  addEventListeners() {
    // Start Game Listener
    const startButton = document.querySelector('#btn-start');
    startButton.addEventListener('click', this.startGame);
    // Roll Dice
    const rollButton = document.querySelector('#roll-btn');
    rollButton.addEventListener('click', (event) => {
      this.rollAndPlay();
    });
  }

  removeEventListeners() {
    // Roll Dice
    const rollButton = document.querySelector('#roll-btn');
    rollButton.removeEventListener('click', (event) => {
      this.rollAndPlay();
    });
  }

  // Renders
  printLog(message) {
    const gamelog = document.getElementById('gamelog');
    const previousAction = document.createElement('li');
    previousAction.textContent = message;
    gamelog.prepend(previousAction);
  }

  renderBoard() {
    const board = new Board(64);
    board.render();
    const boardPanel = document.querySelector('.board-section');
    boardPanel.scrollIntoView();
  }

  renderPlayers() {
    this.playerOne.render();
    this.playerTwo.render();
  }

  renderDices() {
    this.diceOne.render();
    this.diceTwo.render();
  }

  // Layout
  startGame() {
    const playerTurnPanel = document.querySelector('#player-turn');
    playerTurnPanel.classList.toggle('hidden');
    const startGamePanel = document.querySelector('#start-game');
    startGamePanel.classList.toggle('hidden');
  }

  // Rolls
  rollTwoDices() {
    this.diceOne.rollAndRender();
    this.diceTwo.rollAndRender();
    this.dicesResult = this.diceOne.value + this.diceTwo.value;
  }

  // Checks Rolls
  checkFirstRoll(player) {
    if ((this.diceOne.value === 6 && this.diceTwo.value === 3) || (this.diceOne.value === 3 && this.diceTwo.value === 6)) {
      player.previousPosition = player.currentPosition;
      player.currentPosition += 26;
    } else if ((this.diceOne.value === 4 && this.diceTwo.value === 5) || (this.diceOne.value === 5 && this.diceTwo.value === 4)) {
      player.previousPosition = player.currentPosition;
      player.currentPosition += 53;
    }

    this.message = `${player.name} fait un score de ${this.dicesResult}, par ${this.diceOne.value} et ${this.diceTwo.value}, il avance de la case ${player.previousPosition} à la case ${player.currentPosition}`;
    this.printLog(this.message);
  }

  checkMalus(player, secondPlayer) {
    if (player.currentPosition === 19) {
      //Hotel
      player.waiting = 2;
      this.message = `HOTEL: ${player.name} fait un score de ${this.dicesResult} et tombe sur la case Hotel, il doit passer 2 tours`;
      this.printLog(this.message);
    } else if (player.currentPosition === 31) {
      //Puits
      if (secondPlayer.previousPosition === player.currentPosition) {
        console.log(secondPlayer.previousPosition);
        console.log(player.currentPosition);
        player.locked = true;
        secondPlayer.locked = false;
        this.message = `PUITS: ${player.name} fait un score de ${this.dicesResult} et tombe sur la case Puits, il prend la place de ${secondPlayer.name}`;
        this.printLog(this.message);
      } else {
        player.locked = true;
        this.message = `PUITS: ${player.name} fait un score de ${this.dicesResult} et tombe sur la case Puits, il doit attendre qu'un joueur viennent prendre sa place`;
        this.printLog(this.message);
      }
    } else if (player.currentPosition === 42) {
      //Labyrinthe
      player.currentPosition = 30;
      this.message = `LABYRINTHE: ${player.name} fait un score de ${this.dicesResult} et tombe sur la case Labyrinthe, il retourne à la case ${player.currentPosition}`;
      this.printLog(this.message);
    } else if (player.currentPosition === 52) {
      //Prison
      if (secondPlayer.previousPosition === player.currentPosition) {
        player.locked = false;
        secondPlayer.locked = false;
        this.message = `PRISON: ${player.name} fait un score de ${this.dicesResult} et tombe sur la case Prison, il libère ${secondPlayer.name}`;
        this.printLog(this.message);
      } else {
        player.locked = true;
        this.message = `PRISON: ${player.name} fait un score de ${this.dicesResult} et tombe sur la case Prison, il doit attendre qu'un joueur viennent le libérer`;
        this.printLog(this.message);
      }
    } else if (player.currentPosition === 58) {
      //Tête de Mort
      player.currentPosition = 0;
      this.message = `TETE DE MORT: ${player.name} fait un score de ${this.dicesResult} et tombe sur la case Tête de Mort, il recommence à 0`;
      this.printLog(this.message);
    }
  }

  checkBonus(player) {
    if (
      player.currentPosition === 9 ||
      player.currentPosition === 18 ||
      player.currentPosition === 27 ||
      player.currentPosition === 36 ||
      player.currentPosition === 45 ||
      player.currentPosition === 54
    ) {
      //Oies
      player.currentPosition += this.dicesResult;
      this.message = `OIE: ${player.name} fait un score de ${this.dicesResult} et tombe sur une case Oie, il avance à nouveau de ${this.dicesResult} et se retrouve à la case ${player.currentPosition}`;
      this.printLog(this.message);
    } else if (player.currentPosition === 6) {
      //Pont
      player.currentPosition = 12;
      this.message = `PONT: ${player.name} fait un score de ${this.dicesResult} et tombe sur la case Pont, il avance jusqu'à la case ${player.currentPosition}`;
      this.printLog(this.message);
    }
  }

  checkBackward(player) {
    if (player.currentPosition > 63) {
      const back = player.currentPosition - 63;
      player.currentPosition = 63 - back;
      this.message = `TROP LOIN: Le ${player.name} dépasse la case 63 (en faisant un score de ${this.dicesResult}) et doit reculer de ${back} cases, il retourne à la case ${player.currentPosition}`;
      this.printLog(this.message);
    }
  }

  // MOVES

  movePlayerTokenToNewPosition(player) {
    let targetBox = 'case-';
    targetBox += player.currentPosition;
    const box = document.getElementById(targetBox);
    const token = document.getElementById(player.name);
    box.prepend(token);
  }

  movePlayer(player, secondPlayer) {
    const specials = [6, 9, 18, 19, 27, 31, 36, 42, 45, 52, 54, 58];
    let messageEl = document.getElementById('previous-turn');
    let message = '';

    if (player.currentPosition === 0 && this.dicesResult === 9) {
      this.checkFirstRoll(player);
      this.movePlayerTokenToNewPosition(player);
    } else {
      player.previousPosition = player.currentPosition;
      player.currentPosition += this.dicesResult;
    }

    if (specials.includes(player.currentPosition) || player.currentPosition > 63) {
      while ((specials.includes(player.currentPosition) && player.locked === false && player.waiting === 0) || player.currentPosition > 63) {
        this.checkBonus(player);
        this.checkMalus(player, secondPlayer);
        this.checkBackward(player);
      }
    } else {
      this.message = `${player.name} avance jusqu'à la case ${player.currentPosition} avec un score de ${this.dicesResult}`;
      this.printLog(this.message);
    }

    //Manage the one player by box rule.
    if (player.currentPosition === secondPlayer.currentPosition && secondPlayer.currentPosition != 0) {
      secondPlayer.currentPosition = player.previousPosition;
      this.message = `${player.name} atteint la même case que ${secondPlayer.name} et prends sa place`;
      this.printLog(this.message);
    }

    //Move token

    messageEl.textContent = message;
    this.movePlayerTokenToNewPosition(player);
    this.movePlayerTokenToNewPosition(secondPlayer);

    if (player.currentPosition === 63) {
      //Win
      this.message = `Le ${player.name} atteint la case 63 (en faisant un score de ${this.dicesResult}), il a gagné !`;
      this.printLog(this.message);
      this.message = `${player.name} a gagné ! `;
      this.printLog(this.message);
      alert(`${player.name} a gagné ! Nouvelle partie`);

      document.getElementById('player-turn').classList.add('hidden');
    }
  }

  rollAndPlay() {
    // Roll Dice
    this.rollTwoDices();

    // Move Active Player
    if (this.activePlayer == 'Joueur 1') {
      this.movePlayer(this.playerOne, this.playerTwo);
    } else {
      this.movePlayer(this.playerTwo, this.playerOne);
    }

    // Check Next Player
    this.getNextPlayer();
  }

  // TURNS

  getNextPlayer() {
    const turn = document.getElementById('turn');

    if (this.activePlayer === 'Joueur 1') {
      if (this.playerTwo.waiting === 0) {
        if (this.playerTwo.locked === false) {
          this.activePlayer = 'Joueur 2';
          turn.textContent = 'Joueur 2 ';
        } else {
          this.message = 'Joueur 2 ne peut pas sortir de sa case';
          this.printLog(this.message);
        }
      } else {
        this.message = `Joueur 2 passe son tour`;
        this.printLog(this.message);
        this.playerTwo.waiting -= 1;
      }
    } else {
      if (this.playerOne.waiting === 0) {
        if (this.playerOne.locked === false) {
          this.activePlayer = 'Joueur 1';
          turn.textContent = 'Joueur 1 ';
        } else {
          this.message = 'Joueur 1 ne peut pas sortir de sa case';
          this.printLog(this.message);
        }
      } else {
        this.message = `Joueur 1 passe son tour`;
        this.playerOne.waiting -= 1;
        this.printLog(this.message);
      }
    }
  }

  // Init
  init() {
    this.renderBoard();
    this.addEventListeners();
    this.renderPlayers();
    this.renderDices();
  }
}
