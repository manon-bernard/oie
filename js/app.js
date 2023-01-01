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
    waiting:0,
}

const playerTwo = {
    name: 'playerTwo',
    color: 'red',
    currentPosition: 0,
    previousPosition: 0,
    waiting:0,
}

// Fonctions



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

    //Move Fonctions

    function checkFirstRoll(player) {
        if ((game.dice1 === 6 && game.dice2 === 3) || (game.dice1 === 3 && game.dice2 === 6)) {
            player.previousPosition = player.currentPosition;
            player.currentPosition += 26;
        } else if ((game.dice1 === 4 && game.dice2 === 5) || (game.dice1 === 5 && game.dice2 === 4)) {
            player.previousPosition = player.currentPosition;
            player.currentPosition += 53;
        }
    }

    function movePlayer(player, secondPlayer) {

        if (player.currentPosition === 0 && game.result === 9) {

            checkFirstRoll(player)

            console.log(`${player.name} fait un score de ${game.result}, par ${game.dice1} et ${game.dice2}, il avance de la case ${player.previousPosition} à la case ${player.currentPosition}`);

            movePlayerTokenToNewPosition(player);

        } else {

            player.previousPosition = player.currentPosition;
            player.currentPosition += game.result;

            if (player.currentPosition > 63) {
                //Backwards Move
                const back = player.currentPosition - 63;
                player.currentPosition = 63 - back;
                console.log(`Le ${player.name} dépasse la case 63 (en faisant un score de ${game.result}) et doit reculer de ${back} cases, il retourne à la case ${player.currentPosition}`);
            } else if (player.currentPosition === 63) {
                //Win
                alert(`${player.name} a gagné ! `);
            } else {
                if (player.previousPosition === 0 && game.result === 9) {
                    //9 at start
                    checkFirstRoll(player)
                    console.log(`${player.name} fait un score de ${game.result}, par ${game.dice1} et ${game.dice2}, il avance de la case ${player.previousPosition} à la case ${player.currentPosition}`);
                } else if ((player.currentPosition === 9) || (player.currentPosition === 18) || (player.currentPosition === 27) || (player.currentPosition === 36) || (player.currentPosition === 45) || (player.currentPosition === 54)) {
                    //Oies
                    player.currentPosition += game.result;
                    console.log(`${player.name} fait un score de ${game.result} et tombe sur une case Oie, il avance à nouveau de ${game.result} et se retrouve à la case ${player.currentPosition}`);
                } else if (player.currentPosition === 6) {
                    //Pont
                    player.currentPosition = 12;
                    console.log(`${player.name} fait un score de ${game.result} et tombe sur la case Pont, il avance jusqu'à la case ${player.currentPosition}`);
                } else if (player.currentPosition === 42) {
                    //Labyrinthe
                    player.currentPosition = 30;
                    console.log(`${player.name} fait un score de ${game.result} et tombe sur la case Labyrinthe, il retourne à la case ${player.currentPosition}`);
                } else if (player.currentPosition === 58) {
                    //Tête de Mort
                    player.currentPosition = 0;
                    console.log(`${player.name} fait un score de ${game.result} et tombe sur la case Tête de Mort, il recommence à 0`);
                } else if (player.currentPosition === 19) {
                    //Hotel
                    player.waiting = 2;
                    console.log(`${player.name} fait un score de ${game.result} et tombe sur la case Hotel, il doit passer 2 tours`);
                }else {
                    //Other cases
                    console.log(`${player.name} fait un score de ${game.result}, il avance de la case ${player.previousPosition} à la case ${player.currentPosition}`);
                }
            }



            // } else if () {

            // } else if () {

            // } else if () {

            // }

            //Manage the one player by box rule.
            if (player.currentPosition === secondPlayer.currentPosition) {
                secondPlayer.currentPosition = player.previousPosition;
                console.log(`${player.name} atteint la même case que ${secondPlayer.name} et prends sa place`);
            }


            movePlayerTokenToNewPosition(player);
            movePlayerTokenToNewPosition(secondPlayer);
        }


    }

    function movePlayerTokenToNewPosition(player) {
        let targetBox = "case-";
        targetBox += player.currentPosition;
        const box = document.getElementById(targetBox);
        const token = document.getElementById(player.name);
        box.prepend(token);
    }


    //Game: Active Player

    if (game.activePlayer == 'playerOne') {
        movePlayer(playerOne, playerTwo);
    } else {
        movePlayer(playerTwo, playerOne);
    }

    // Game: Next Player
    const turn = document.getElementById('turn');

    if (game.activePlayer === 'playerOne') {
        if (playerTwo.waiting === 0) {
            game.activePlayer = 'playerTwo';
            turn.textContent = 'Joueur 2 ';
        } else {
            console.log(`playerTwo passe son tour`);
            playerTwo.waiting -= 1;
        }
    } else {
        if (playerOne.waiting === 0) {
            game.activePlayer = 'playerOne';
            turn.textContent = 'Joueur 1 ';
        } else {
            console.log(`playerOne passe son tour`);
            playerOne.waiting -= 1;
        }
    }


}



  //gestion de l'arrivée
  //gestion des cases spéciales
  //gestion des cases occupées

