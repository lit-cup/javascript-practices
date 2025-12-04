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

let scores, currentScore, activePlayer, playing;


//init game
const init = function(){
    
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    player0.classList.remove('player-winner');
    player1.classList.remove('player-winner');
    player0.classList.add('player-active');
    player1.classList.remove('player-active');
    diceEL.classList.add('hidden');

    current0EL.textContent = 0;
    current1EL.textContent = 0;
    score0EL.textContent = 0;
    score1EL.textContent = 0;
}
init();

const switchPlayer = function(){
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
}


btnRoll.addEventListener('click', function() {
    if(playing){
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEL.classList.remove('hidden');
        diceEL.src = `./images/dice-${dice}.png`;
        //check for rolled 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        scores[activePlayer]+= currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    
        if(scores[activePlayer]>=100){
            playing = false;
            diceEL.classList.add('hidden');
            document
                .querySelector(`.player-${activePlayer}`)
                .classList.add('player-winner');
            document
                .querySelector(`.player-${activePlayer}`)
                .classList.remove('player-active');
        }else{
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);

// toggle() is a method that:
// Adds the class if it's not already present
// Removes the class if it's already present