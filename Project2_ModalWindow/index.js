'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.open-modal'); //<- this is Array

for(let i=0; i<btnsOpenModal.length; i++){
    btnsOpenModal[i].addEventListener('click', function(){
        modal.classList.remove('content');
        overlay.classList.remove('content');
    });
}
btnCloseModal.addEventListener('click', function(){
    modal.classList.add('content');
    overlay.classList.add('content');
});