'use strict';

//DONE: 
//Guess the number Game UI
// 1. Practice DOM Manipulation
// 2. Practice Click Event Handling
// 3. Manipulating CSS Styles

const scoreValue = document.querySelector('.score-value');
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

//overriding the message output
const displayMessage = function(message){
    document.querySelector('.label-message').textContent = message;
}
//[again] btn click event
document.querySelector('.btn-again').addEventListener('click', function(){
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayMessage('Start guessing...'); 
    document.querySelector('.guess').value = '';
    scoreValue.textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#ffdddd';
    document.querySelector('.number').style.width = '50%';

});

//[check] btn click event
document.querySelector('.btn-check').addEventListener('click', function(){
    const guess = Number(document.querySelector('.guess').value);
    //empty check
    if(!guess){
        displayMessage('⛔ No Number!');
    }
    //What guess makes action the same situation and different situation 
    else if(guess === secretNumber){
        displayMessage('🎉 Correct Number!');
    
        document.querySelector('body').style.backgroundColor = '#fffb00';
        document.querySelector('.number').textContent = secretNumber;
    
        if(score > highscore){
            highscore = score;
            document.querySelector('.highscore-value').textContent = highscore;
        }
    }else if(guess !== secretNumber){

        if(score > 1){
            displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
            score--;
            scoreValue.textContent = score;
        }else{
            displayMessage('💥 You lost the game!');
            scoreValue.textContent = 0;
        }
    }
});
