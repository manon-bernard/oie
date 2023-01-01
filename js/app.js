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
    waiting: 0,
    locked: false,
}

const playerTwo = {
    name: 'playerTwo',
    color: 'red',
    currentPosition: 0,
    previousPosition: 0,
    waiting: 0,
    locked: false,
}

const specials = [6, 9, 18, 19, 27, 31, 36, 42, 45, 52, 54, 58];

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
        console.log(`${player.name} fait un score de ${game.result}, par ${game.dice1} et ${game.dice2}, il avance de la case ${player.previousPosition} à la case ${player.currentPosition}`);
    }

    function checkMalus(player, secondPlayer) {

        if (player.currentPosition === 19) {
            //Hotel
            player.waiting = 2;
            console.log(`HOTEL: ${player.name} fait un score de ${game.result} et tombe sur la case Hotel, il doit passer 2 tours`);
        } else if (player.currentPosition === 31) {
            //Puits
            if (secondPlayer.previousPosition === player.currentPosition) {
                console.log(secondPlayer.previousPosition);
                console.log(player.currentPosition);
                player.locked = true;
                secondPlayer.locked = false;
                console.log(`PUITS: ${player.name} fait un score de ${game.result} et tombe sur la case Puits, il prend la place de ${secondPlayer.name}`);
            } else {
                player.locked = true;
                console.log(`PUITS: ${player.name} fait un score de ${game.result} et tombe sur la case Puits, il doit attendre qu'un joueur viennent prendre sa place`);
            }
        } else if (player.currentPosition === 42) {
            //Labyrinthe
            player.currentPosition = 30;
            console.log(`LABYRINTHE: ${player.name} fait un score de ${game.result} et tombe sur la case Labyrinthe, il retourne à la case ${player.currentPosition}`);
        } else if (player.currentPosition === 52) {
            //Prison
            if (secondPlayer.previousPosition === player.currentPosition) {
                player.locked = false;
                secondPlayer.locked = false;
                console.log(`PRISON: ${player.name} fait un score de ${game.result} et tombe sur la case Prison, il libère ${secondPlayer.name}`);
            } else {
                player.locked = true;
                console.log(`PRISON: ${player.name} fait un score de ${game.result} et tombe sur la case Prison, il doit attendre qu'un joueur viennent le libérer`);
            }
        } else if (player.currentPosition === 58) {
            //Tête de Mort
            player.currentPosition = 0;
            console.log(`TETE DE MORT: ${player.name} fait un score de ${game.result} et tombe sur la case Tête de Mort, il recommence à 0`);
        }
    }

    function checkBonus(player) {
        if ((player.currentPosition === 9) || (player.currentPosition === 18) || (player.currentPosition === 27) || (player.currentPosition === 36) || (player.currentPosition === 45) || (player.currentPosition === 54)) {
            //Oies
            player.currentPosition += game.result;
            console.log(`OIE: ${player.name} fait un score de ${game.result} et tombe sur une case Oie, il avance à nouveau de ${game.result} et se retrouve à la case ${player.currentPosition}`);
        } else if (player.currentPosition === 6) {
            //Pont
            player.currentPosition = 12;
            console.log(`PONT: ${player.name} fait un score de ${game.result} et tombe sur la case Pont, il avance jusqu'à la case ${player.currentPosition}`);
        }
    }

    function checkBackward(player) {
        if (player.currentPosition > 63) {
            const back = player.currentPosition - 63;
            player.currentPosition = 63 - back;
            console.log(`TROP LOIN: Le ${player.name} dépasse la case 63 (en faisant un score de ${game.result}) et doit reculer de ${back} cases, il retourne à la case ${player.currentPosition}`);
        }
    }

    function movePlayerTokenToNewPosition(player) {
        let targetBox = "case-";
        targetBox += player.currentPosition;
        const box = document.getElementById(targetBox);
        const token = document.getElementById(player.name);
        box.prepend(token);
    }

    function movePlayer(player, secondPlayer) {

        if (player.currentPosition === 0 && game.result === 9) {
            checkFirstRoll(player)
            movePlayerTokenToNewPosition(player);

        } else {
            player.previousPosition = player.currentPosition;
            player.currentPosition += game.result;
        }

        if (specials.includes(player.currentPosition) || player.currentPosition > 63) {
            while (specials.includes(player.currentPosition) && (player.locked === false) && (player.waiting === 0) || player.currentPosition > 63) {
                checkBonus(player);
                checkMalus(player, secondPlayer);
                checkBackward(player);
            }
        } else {
            console.log(`${player.name} avance jusqu'à la case ${player.currentPosition} avec un score de ${game.result}`);
        }

        //Manage the one player by box rule.
        if (player.currentPosition === secondPlayer.currentPosition) {
            secondPlayer.currentPosition = player.previousPosition;
            console.log(`${player.name} atteint la même case que ${secondPlayer.name} et prends sa place`);
        }

        //Move token (slightly slower)

        movePlayerTokenToNewPosition(player);
        movePlayerTokenToNewPosition(secondPlayer);


        if (player.currentPosition === 63) {
            //Win
            console.log(`Le ${player.name} atteint la case 63 (en faisant un score de ${game.result}), il a gagné !`);
            alert(`${player.name} a gagné ! `);
        }
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
            if (playerTwo.locked === false) {
                game.activePlayer = 'playerTwo';
                turn.textContent = 'Joueur 2 ';
            } else {
                console.log('playerTwo ne peut pas sortir de sa case');
            }
        } else {
            console.log(`playerTwo passe son tour`);
            playerTwo.waiting -= 1;
        }
    } else {
        if (playerOne.waiting === 0) {
            if (playerOne.locked === false) {
                game.activePlayer = 'playerOne';
                turn.textContent = 'Joueur 1 ';;
            } else {
                console.log('playerOne ne peut pas sortir de sa case');
            }

        } else {
            console.log(`playerOne passe son tour`);
            playerOne.waiting -= 1;
        }
    }
}