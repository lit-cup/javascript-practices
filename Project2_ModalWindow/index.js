'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.open-modal'); //<- this is Array

const openModal = function(){
    modal.classList.remove('content');
    overlay.classList.remove('content');
}
const closeModal = function(){
    modal.classList.add('content');
    overlay.classList.add('content');
}

for(let i=0; i<btnsOpenModal.length; i++){
    btnsOpenModal[i].addEventListener('click', openModal);
}
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
