'use strict';
// Features implemented in this script:
// 1. Modal window functionality
// 2. Smooth scrolling for buttons
// 3. Page navigation with event delegation
// 4. Tabbed component for operations section
// 5. Menu fade animation on hover
// 6. Sticky navigation using Intersection Observer API
// 7. Section reveal animations on scroll
// 8. Slider function: slide, btn click slide, dots click clide

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const header = document.querySelector('.header');
const navheight = nav.getBoundingClientRect().height;
///////////////////////////////////////
// Modal window

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

///////////////////////////////////////////////////////////////////////
/// button Scroll
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

///////////////////////////////////////////////////////////////////////
/// Page Navigation

// but when every click will forEach every elemnt not efficient
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// })

// more efficient make single listener for multiple elements
// 1. add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const sectionId = e.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Rmoeve active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const headFadeHover = function (e) {
  if (e.target.classList.contains('nav__link'));
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  siblings.forEach(el => {
    if (el !== link) el.style.opacity = this;
  });
  logo.style.opacity = this;
}

// Passing "argument" into handler
nav.addEventListener('mouseover', headFadeHover.bind(0.5));
nav.addEventListener('mouseout', headFadeHover.bind(1));

// Sticky navigaion
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (this.window.scrollY > initialCoords.top)
//     nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Better way to Use Intersction Observer API
const stickyNav = function (entries) {
  const [entry] = entries; // entries[0]
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(
  stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
});
headerObserver.observe(header);

// Reveal sections
// 1. add className section--hidden
// 2. creat a IntersectionOBserver
// 3. remove className section--hidden, unobserve;
const allSections = document.querySelectorAll('.section');

// application
const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
// style
const sectionObserver = new IntersectionObserver(
  revealSection, {
  root: null,
  threshold: 0.15,
});

// active
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images
const loadImg = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src with dat-src
  entry.target.src = entry.target.dataset.src;

  // remove blur
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observe.unobserve(entry.target);
};


const imgTargets = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));


// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSLide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.trnasform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // Dots slide
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };


  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  const goToSlide = function (slide) {
    slides.forEach((s, i) =>
      (s.style.transform = `translateX(${100 * (i - slide)}%)`));  // 0% 100% 200% 300%
  }


  const rightSlide = function () {
    if (curSlide === maxSLide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);   // i = 0 | curSlide = 1  -100% 0% 200% 300%
    activateDot(curSlide);
  }

  const leftSlide = function () {
    if (curSlide === 0) curSlide = maxSLide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();

  // Next slide
  btnRight.addEventListener('click', rightSlide);
  btnLeft.addEventListener('click', leftSlide);

  // keydown event
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') leftSlide();
    if (e.key === 'ArrowRight') rightSlide();
  })

  // dot slide click event
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
}
slider();