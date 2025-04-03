// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue,
 each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. 
Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
(function () {
    const header = document.querySelector('h1'); // this is private variable
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click', () => header.style.color = 'blue');
})();
// My Explanation:
// The event listener "remembers" the header variable because it was defined in the same scope where the listener was created.
// Even though the IIFE has finished running, the closure keeps header alive in memory, tied to the event listener.

// Steps by Steps by Grok 3 Teach:
// Variable Declaration:
// Inside the IIFE, const header = document.querySelector('h1') selects the first <h1> element on the page and stores it in the header variable.
// Since header is declared with const, it’s block-scoped to the IIFE and can’t be reassigned (though its properties, like style, can still be modified).

// Initial Action: The line header.style.color = 'red' immediately sets the <h1> element’s text color to red when the IIFE runs.

// Event Listener: The line document.querySelector('body').addEventListener('click', () => header.style.color = 'blue') attaches a click event listener to the <body> element.
// The listener is an arrow function that changes the header’s color to blue whenever the body is clicked.

// IIFE Completion: After the IIFE finishes executing, you might wonder: how can the event listener still access header? This is where closures come in.
// The event listener "remembers" the header variable because it was defined in the same scope where the listener was created. Even though the IIFE has finished running,
// the closure keeps header alive in memory, tied to the event listener.

// Persistent Listener: The event listener doesn’t disappear after the IIFE runs—it’s attached to the <body> element and stays active,
// waiting for click events. Every time you click the body, the listener triggers and updates header.style.color to 'blue'.



// Key points:
// The IIFE creates a private scope.
// The event listener survives because it’s attached to the <body>.
// The closure keeps header accessible to the listener.

// Explanation in detail:
// "This code uses an IIFE to create a private scope. Inside, it selects an <h1> element,
// sets its color to red, and adds a click event listener to the <body>. When the body is clicked,
// the listener changes the <h1> color to blue. Even though the IIFE finishes running,
// the event listener stays active because it’s attached to the DOM, and a closure keeps the header variable accessible to the listener.
// This is why the color can still change on clicks."





