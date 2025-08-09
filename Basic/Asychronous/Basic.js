// Synchronous & Asynchronous & AJAX & API JavaScript code example

// Synchronous
/*
    Most of code is synchronous
    Synchronous code is executed line by line, one after another.
    Each line of code {waits} for the previous line to finish before executing.
    // The bad part
    Long-running synchronous code can block the main thread, causing the UI to freeze.

    Not occurring at the same time
    */
const p = document.querySelector('.promise');
p.textContent = 'Loading...';
alert('Synchronous code starts'); // when executed, the browser will show an alert and block the UI until the user dismisses it.
p.style.color = 'red';

// Asynchronous
/*
    Asynchronous code is executed after a task that runs in the background is completed.
    Asynchronous code is non-blocking
    Execution doesn't wait for an asynchronous task to finish its work
    Callback functions alone do NOT make code asynchrounous.

    Coordinating bahavior of program over a period of time
    */

// Example of Asynchronous code: Timer with callback
/*
    Timer executed after all other code after time out is set which like deferring the execution of the code
 */
const p = document.querySelector('.promise');
setTimeout(() => {
    p.textContent = 'Asynchronous code finished';
    p.style.color = 'green';
}, 2000); // This will run after 2 seconds, without blocking the UI
p.sytle.color = 'blue'; // This line will execute immediately after setTimeout is called

// AJAX
/*
    Data format:
    (not used this day) XML (eXtensible Markup Language) to transmit data between a client and a server.
    (mostly used this day) JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy to read and write.
*/
/*
    AJAX (Asynchronous JavaScript and XML) allows us to communicate with remote web servers in an asynchronous way.
    With AJAX calls, we can request data from web servers dynamically.

    // Working flow

    Clint-side(browser)

    -(request: Asking for some data)->

    Web-Server-side(Usually has web API)

    -(response: Sending data back)->

    Client-side(browser)
*/

// API
/*
    API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other.
    APIs can be used to access data or functionality from a web server, database, or other service.
    APIs can be synchronous or asynchronous, depending on how they are designed.
    Piece of software that can be used by another piece of software, in order to allow applications to talk to each other.

    There are be many types of APIs in web development:
    - DOM APIs: Allow interaction with the browser's Document Object Model (DOM).
    - Geolocation API: Provides access to the user's geographical location.
    - Own Class APIs: Custom APIs created by developers to expose specific functionality or data.
    - Online APIs: 
        Web-based APIs that allow applications to interact with online services, such as social media platforms, payment gateways, or data providers.
        Application running on a server, that receives requests for data, and sens data back as response.
    
    - We can build our own web APIs but (requires back-end development knowledge, etc. with node.js, next.js) or use 3rd-party APIs (like OpenAI, Google Maps, etc.) to access data or functionality provided by other services.
 */

