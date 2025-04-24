'use strict';
// Select、create、insert、delete element by DOM
// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
console.log(document.getElementsByTagName('button'));

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionlity and analytices.'
message.innerHTML = 'We use cookied for improved functionlity and analytices. <button class="btn btn--close-cookie">Got it!</butoon>'

// add to the first child
// header.prepend(message)
// add to the last child
header.append(message);
// add to the both
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document.querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
        // message.remove();
        // make element excatly we should used below to DOM traversing
        message.parentElement.removeChild(message);
    })

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// Styles getComputedStyle() to set() get() css elements
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
    Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// set css root: color element
document.documentElement.style.setProperty('--color-primary', '#e24a4a');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));

// Attribute set, get
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes 
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
// toggle()  
// removes an existing token from the list and returns false.
// If the token doesn't exist it's added and the function returns true.
logo.classList.toggle('c');

// contains()
// returns a boolean value — 
// true if the underlying list contains the given token, otherwise false.
logo.classList.contains('c');

// Don't use
logo.className = 'jonas';


// Types if events/ Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
    alert('addEventListener: Great! You are reading the heding :D');
}

h1.addEventListener('mouseenter', alertH1);

// remove after 3 sec
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)
// h1.onmouseenter = function (e) {
//     alert('addEventListener: Great! You are reading the heding :D');
// }

// Event Propagation: Understanding how events propagate through the DOM
// Events propagate in three phases: capturing, target, and bubbling phases

// Example: Adding event listeners to demonstrate event propagation by color
const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
    `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

{/* <nav class="nav">
      <ul class="nav__links">
        <li class="nav__item">
          <a class="nav__link" href="#section--1">Features</a> */}

document.querySelector('.nav__link').addEventListener('click', function (e) {
    // Case 1 click nav__link element
    // all have click listener will active because of Bubbling(parent element)
    this.style.backgroundColor = randomColor();
    // selct target and currentTarget are different
    console.log('Link', e.target, e.currentTarget);
    // currentTarget are same as 'this' attach
    console.log(e.currentTarget === this);

    // // Stop propagation
    // e.stopPropagation();
})

document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('CONTAINER', e.target, e.currentTarget);
    console.log(e.currentTarget === this);
})

document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
    console.log(e.currentTarget === this);
})


// DOM Traversing

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// all sibling and not just previous and the next one
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
    if (el !== h1) el.style.transform = 'scale(0.5)';
});

// Sticky navigaion: Intersecion Observer API
const obsCallback = function (entries, observer) {
    entries.forEach(entry => {
        console.log(entry)
    })
};
const obsOptions = {
    root: null,
    threshold: [0, 0.2],
}
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);


// Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
    console.log('HTML parsed and DOm tree built!', e);
})

window.addEventListener('load', function (e) {
    console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     console.log(e);
//     e.returnValue = '';
// });

// Efficient Script Loading

// END OF BODY
// <script src="script.js"></script>
// Use this if you need to support older browsers or if the script must load after the HTML is fully parsed.
// How it works: The script is loaded and executed only after the entire HTML document is parsed.

// ASYNC in HEAD
// <script async src="script.js"></script>
// Use for third-party scripts where the order of execution doesn't matter (e.g., Google Analytics).
// How it works: The script is loaded asynchronously and executed as soon as it's available, without blocking the HTML parsing.

// DEFER in HEAD
// <script defer src="script.js"></script>
// This is the best solution overall! Use it for your own scripts and when the order of execution matters (e.g., including a library).
// How it works: The script is loaded in parallel with HTML parsing but executed only after the HTML document is fully parsed.