'use strict';

//DONE: 
//Guess the number Game UI
let score = 20;
const scoreValue = document.querySelector('.score-value');
const message = document.querySelector('.label-message');
let secretNumber = Math.trunc(Math.random() * 20) + 1;

//[again] btn click event
document.querySelector('.btn-again').addEventListener('click', function(){
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    message.textContent = 'Start guessing...';
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
        message.textContent = '⛔ No Number!';
    }
    //When guess is correct
    if(guess === secretNumber){
        message.textContent = '🎉 Correct Number!';
        document.querySelector('body').style.backgroundColor = '#fffb00';
        document.querySelector('.number').textContent = secretNumber;
    }
    //When guess is bigger than secret number
    else if(guess > secretNumber){
        if(score > 1){
            message.textContent = '📈 Too High!';
            score--;
            scoreValue.textContent = score;
        }else{          
            message.textContent = '💥 You lost the game!';
            scoreValue.textContent = 0;
        }
    }
    //When guess is smaller than secret number
    else if(guess < secretNumber){
        if(score > 1){
            message.textContent = '📉 Too Low!';
            score--;
            scoreValue.textContent = score;
        }else{
            message.textContent = '💥 You lost the game!';
            scoreValue.textContent = 0;
        }
    }
});

//TODO:
// 1. Practice DOM Manipulation
// 2. Practice Click Event Handling
// 3. Manipulating CSS Styles