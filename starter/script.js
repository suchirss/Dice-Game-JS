'use strict';
'use strict';

// define variables
let currentRoll;
let currentSum1 = 0;
let currentSum2 = 0;
let totalSum1 = 0;
let totalSum2 = 0;
let readyPlayerOne = true;
let playing = true;
const winScore = 100;

// define element variables
const diceButtonRoll = document.querySelector('.btn--roll');
const diceButtonHold = document.querySelector('.btn--hold');
const diceButtonNew = document.querySelector('.btn--new');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const sumScore1 = document.querySelector('#score--0');
const sumScore2 = document.getElementById('score--1');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');
const dice = document.querySelector('.dice');

// we can also use getElementByID for getting ID's -- slightly faster than querySelector() + we don't have to specify ID or class with . or # since we already know it's ID

// initial conditions:
sumScore1.textContent = 0;
sumScore2.textContent = 0;
dice.classList.add('hidden');

// button: rolls dice
diceButtonRoll.addEventListener('click', function () {
  if (playing) {
    // random roll
    currentRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(currentRoll);
    // display new role
    dice.src = `dice-${currentRoll}.png`;
    dice.classList.remove('hidden');
    // add to score
    if (currentRoll !== 1) {
      calcCurrentSums();
    }
    // switch turns if 1 is rolled
    else {
      readyPlayerOne = !readyPlayerOne;
      currentSum1 = 0;
      currentScore1.textContent = currentSum1;
      currentSum2 = 0;
      currentScore2.textContent = currentSum2;
      switchActivePlayerDisplay();
    }
  }
});

// button: holds score
diceButtonHold.addEventListener('click', function () {
  if (playing) {
    let preSum1 = totalSum1 + currentSum1;
    let preSum2 = totalSum2 + currentSum2;
    if (readyPlayerOne && preSum1 < winScore) {
      totalSum1 += currentSum1;
      sumScore1.textContent = totalSum1;
      readyPlayerOne = !readyPlayerOne;
      currentSum1 = 0;
      currentScore1.textContent = currentSum1;
      switchActivePlayerDisplay();
      console.log(totalSum1);
    } else if (!readyPlayerOne && preSum2 < winScore) {
      totalSum2 += currentSum2;
      sumScore2.textContent = totalSum2;
      readyPlayerOne = !readyPlayerOne;
      currentSum2 = 0;
      currentScore2.textContent = currentSum2;
      console.log(totalSum2);
      switchActivePlayerDisplay();
    } else if (preSum1 >= winScore) {
      // player 1 wins
      playing = false;
      player1.classList.add('player--winner');
      totalSum1 += currentSum1;
      sumScore1.textContent = totalSum1;
    } else if (preSum2 >= winScore) {
      // player 2 wins
      player2.classList.add('player--winner');
      playing = false;
      totalSum2 += currentSum2;
      sumScore2.textContent = totalSum2;
    }
  }
});

// button: new game
diceButtonNew.addEventListener('click', function () {
  if (!readyPlayerOne) {
    switchActivePlayerDisplay();
  }
  reset();
});

// function: add sums
// purpose: to add currentRoll to the score of whichever player is actively rolling
const calcCurrentSums = function () {
  if (readyPlayerOne) {
    currentSum1 += currentRoll;
    currentScore1.textContent = currentSum1;
  } else {
    currentSum2 += currentRoll;
    currentScore2.textContent = currentSum2;
  }
};

// reset game:
const reset = function () {
  playing = true;
  readyPlayerOne = true; // player 1 will be starting
  totalSum1 = 0;
  sumScore1.textContent = totalSum1;
  totalSum2 = 0;
  sumScore2.textContent = totalSum2;
  currentSum1 = 0;
  currentScore1.textContent = currentSum1;
  currentSum2 = 0;
  currentScore2.textContent = currentSum2;
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};

// switches white background from player 1 to 2 or vice versa

const switchActivePlayerDisplay = function () {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};
