const oddsOrEvensContainer = document.querySelector('#odds-or-evens-container');
const numbersContainer = document.querySelector('#numbers-container');
let hasUserChoosen = false;
let userChoice;

function resetGame() {
  hasUserChoosen = false;
  document.querySelector('#user-choice').innerText = '';
}

function computerRandomNumber() {
  return Math.floor(Math.random() * 6);
}

function chooseOddOrEven(e) {
  if (e.target.tagName === 'BUTTON') {
    const userChoiceEl = document.querySelector('#user-choice');
    userChoice = e.target.dataset.choice;
    userChoiceEl.textContent = userChoice;
    hasUserChoosen = true;
  }
}

function displayWinner(winner, userNumber, computerNumber, sum) {
  console.log(winner);
  const dialogEl = document.querySelector('dialog');
  const dialogText = document.querySelector('#dialog-text');
  const dialogText2 = document.querySelector('#dialog-text2');
  const dialogText3 = document.querySelector('#dialog-text3');
  const dialogText4 = document.querySelector('#dialog-text4');
  const dialogSum = dialogEl.querySelector('#sum');
  const btnPlayAgain = dialogEl.querySelector('#play-again');
  let textResult;

  if (winner === 'user') {
    textResult = 'You win!';
  } else {
    textResult = 'You lose!';
  }
  dialogText.textContent = textResult;
  dialogText2.textContent = `You chose ${userChoice}`;
  dialogText3.textContent = `Your number: is: ${userNumber}`;
  dialogText4.textContent = `Computer's number is: ${computerNumber}`;
  dialogSum.textContent = `Sum is: ${sum}`;
  dialogEl.showModal();

  btnPlayAgain.addEventListener('click', () => {
    resetGame();
    dialogEl.close();
  });
}

function playGame(e) {
  if (e.target.tagName === 'BUTTON' && hasUserChoosen) {
    let winner;
    const userNumber = Number(e.target.textContent);
    const computerNumber = computerRandomNumber();
    const sum = userNumber + computerNumber;
    const isEven = sum % 2 === 0;

    if (userChoice === 'evens') {
      if (isEven) {
        winner = 'user';
      } else {
        winner = 'computer';
      }
    } else if (userChoice === 'odds') {
      if (isEven) {
        winner = 'computer';
      } else {
        winner = 'user';
      }
    }
    displayWinner(winner, userNumber, computerNumber, sum);
  }

  if (e.target.tagName === 'BUTTON' && !hasUserChoosen) {
    alert('You have to chose evens or odds to continue');
  }
}

oddsOrEvensContainer.addEventListener('click', chooseOddOrEven);
numbersContainer.addEventListener('click', playGame);
