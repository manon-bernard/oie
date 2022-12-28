//Event Start Game
const startButton = document.querySelector("#btn-start");
startButton.addEventListener('click', handleStartButton);


function handleStartButton() {
    const playerTurnPanel = document.querySelector('#player-turn');
    playerTurnPanel.classList.toggle('hidden');
    const startGamePanel = document.querySelector('#start-game');
    startGamePanel.classList.toggle('hidden');
}

//Players objects

const game = {
    activePlayer: 'playerOne',
    dice1:0,
    dice2:0,
    result:0,
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

    console.log(game);


    //Avance oie
    //Calcul position
    if (game.activePlayer == 'playerOne'){

        //Attribution du résultat des dés et calcul des positions.
        playerOne.previousPosition = playerOne.currentPosition;
        playerOne.currentPosition += game.result;
        let targetBox = "case-";
        targetBox += playerOne.currentPosition;

        console.log(`${playerOne.name} fait un score de ${game.result}, par ${game.dice1} et ${game.dice2}, il avance de la case ${playerOne.previousPosition} à la case ${playerOne.currentPosition}`);
        
        //Avancer l'oie du joueur
        const token1 = document.getElementById('playerOne-goose');
        const box1 = document.getElementById(targetBox);
        box1.prepend(token1);
        
    } else {
        //Attribution du résultat des dés et calcul des positions.
        playerTwo.previousPosition = playerTwo.currentPosition;
        playerTwo.currentPosition += game.result;
        let targetBox = "case-";
        targetBox += playerTwo.currentPosition;

        console.log(`${playerTwo.name} fait un score de ${game.result}, par ${game.dice1} et ${game.dice2}, il avance de la case ${playerTwo.previousPosition} à la case ${playerTwo.currentPosition}`);
        
        //Avancer l'oie du joueur
        const token2 = document.getElementById('playerTwo-goose');
        const box2 = document.getElementById(targetBox);
        box2.prepend(token2);
    }



    //Passer au joueur suivant
    const turn = document.getElementById('turn');

    if (game.activePlayer =='playerOne'){
        game.activePlayer = 'playerTwo';
        turn.textContent = 'Joueur 2 '
    } else {
        game.activePlayer = 'playerOne';
        turn.textContent = 'Joueur 1 '
    }  
    
}



  //Gestion du tour par tour

