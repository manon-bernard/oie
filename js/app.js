//Event Start Game
const startButton = document.querySelector("#btn-start");
startButton.addEventListener('click', handleStartButton);


function handleStartButton() {
    const playerTurnPanel = document.querySelector('#player-turn');
    playerTurnPanel.classList.toggle('hidden');
    const startGamePanel = document.querySelector('#start-game');
    startGamePanel.classList.toggle('hidden');
}


// Dice roll

const rollButton = document.querySelector("#roll-btn");
rollButton.addEventListener('click', handleRollButton)



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

  function handleRollButton(){
      let dices = document.getElementsByClassName("dice");
    
      for (i = 0; i < dices.length; i++) {
        rollOne(dices[i]);
      }
  }