'use-static';

// Selecting elements by id
const current0EL = document.getElementById('current-0');
const current1EL = document.getElementById('current-1');
const score0EL = document.getElementById('score-0');
const score1EL = document.getElementById('score-1');
const diceEL = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll');
const btnNew = document.querySelector('.btn-new');
const btnHold = document.querySelector('.btn-hold');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

current0EL.textContent = 0;
current1EL.textContent = 0;
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

btnRoll.addEventListener('click', function() {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `./images/dice-${dice}.png`;
    //check for rolled 1
    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    } else {
        document.getElementById(`current-${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0.classList.toggle('player-active');
        player1.classList.toggle('player-active');
    }
});