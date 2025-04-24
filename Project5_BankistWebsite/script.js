'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // section1 position
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // btnScrollTo position
  // console.log(e.target.getBoundingClientRect());

  // Current Scroll(X/Y)
  // console.log('Current scroll(X/Y)', window.scrollX, scrollY);

  // height/width viewport
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // )

  // Scrolling old school
  // window.scrollTo(
  //   slcoords.left + window.scrollX,
  //   slcoords.top + window.scrollY
  // );
  // window.scrollTo({
  //   left: slcoords.left + window.scrollX,
  //   top: slcoords.top + window.scrollY,
  //   behavior: 'smooth'
  // });

  // morden way
  section1.scrollIntoView({ behavior: 'smooth' });
});