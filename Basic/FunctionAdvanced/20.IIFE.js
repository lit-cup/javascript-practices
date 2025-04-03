// Immediately Invoked Function Expression (IIFE)


// normally we could use function like this

const runOnce = function () {
    console.log('This will run once!');
}

    // but if we want to run like functio() 
    // we should use IIFE
    (function () {
        console.log('This will run once!');
        const isPrivate = 23; // private variable
    })();

// arrow function IIFE
(() => console.log('This will also run once!'))();

// Why we don't use IIFE in modern JS
// it's more easy way to write like this
{
    const isPrivate = 23; // private variable
    var notPrivate = 46; // not private variable
}