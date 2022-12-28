//Event Start Game
const startButton = document.querySelector("#btn-start");
startButton.addEventListener('click', handleStartButton);


function handleStartButton() {
    const playerTurnPanel = document.querySelector('#player-turn');
    playerTurnPanel.classList.toggle('hidden');
    const startGamePanel = document.querySelector('#start-game');
    startGamePanel.classList.toggle('hidden');
}

//Players & Game objects

const game = {
    activePlayer: 'playerOne',
    dice1: 0,
    dice2: 0,
    result: 0,
}

const playerOne = {
    name: 'playerOne',
    color: 'blue',
    currentPosition: 0,
    previousPosition: 0,
}

const playerTwo = {
    name: 'playerTwo',
    color: 'red',
    currentPosition: 0,
    previousPosition: 0,
}

// Dice roll

const rollButton = document.querySelector("#roll-btn");
rollButton.addEventListener('click', handleRollButton);

function rollOne(element) {
    const face = Math.round(Math.random() * 5 + 1);

    element.classList.remove("one", "two", "three", "four", "five", "six");

    if (face === 1) {
        element.classList.add("one");
    } else if (face === 2) {
        element.classList.add("two");
    } else if (face === 3) {
        element.classList.add("three");
    } else if (face === 4) {
        element.classList.add("four");
    } else if (face === 5) {
        element.classList.add("five");
    } else {
        element.classList.add("six");
    }

    return face;
}

function handleRollButton() {

    let dices = document.getElementsByClassName("dice");

    //Roll
    game.dice1 = rollOne(dices[0]);
    game.dice2 = rollOne(dices[1]);
    game.result = game.dice1 + game.dice2;

    //Move

    let targetBox = "case-";

    function movePlayer(player) {
        //Store starting point in previous position.
        player.previousPosition = player.currentPosition;

        //Update new position in current position.
        player.currentPosition += game.result;

        //Move Player token
        targetBox += player.currentPosition;
        const box = document.getElementById(targetBox);
        const token = document.getElementById(player.name);
        box.prepend(token);

        
        // console.log(`${player.name} fait un score de ${game.result}, par ${game.dice1} et ${game.dice2}, il avance de la case ${player.previousPosition} à la case ${player.currentPosition}`);
    }

    if (game.activePlayer == 'playerOne') {
        movePlayer(playerOne);
    } else {
        movePlayer(playerTwo);
    }

    //Passer au joueur suivant
    const turn = document.getElementById('turn');

    if (game.activePlayer == 'playerOne') {
        game.activePlayer = 'playerTwo';
        turn.textContent = 'Joueur 2 '
    } else {
        game.activePlayer = 'playerOne';
        turn.textContent = 'Joueur 1 '
    }

}



  //gestion de l'arrivée
  //gestion des cases spéciales
  //gestion des cases occupées

