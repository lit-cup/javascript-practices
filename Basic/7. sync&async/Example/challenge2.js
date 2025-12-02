'use strict';

// Challenge 2: Load and remove images sequentially with promises
// This code will load an image using promises method, wait for 2 seconds, hidde it, and then load another image.
// 1. Create a function `wait` that returns a promise that resolves after a given number of seconds.
// 2. Create a function `createImage` that returns a promise that resolves with an image element when the image is loaded.
// 3. Use the `createImage` function to load an image, wait for 2 seconds, hidde it, and then load another image.
// 4. Handle errors if the image fails to load.

// TEST: using image paths 'img/img-1.jpg' and 'img/img-2.jpg' to check the functionality.
// if imgPath is not correct it throw an error message 'Image not found'.

const imageContainer = document.querySelector('.images');

const wait = function (seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
        console.log(`Waiting for ${seconds} seconds...`);
    });
}

const createImage = function(imgPath) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = imgPath;
        img.addEventListener('load', function(){
            imageContainer.append(img);
            resolve(img);
        });
        img.addEventListener('error', function(){
            reject(new Error('Image not found'));
        });
    });
}
let currentImage = null;
createImage('img/img-1.jpg')
    .then(img => {
        currentImage = img;
        console.log(img, 'Image 1 loaded');
        return wait(2);
    })
    .then(() => {
        currentImage.style.display = 'none';
        console.log('Image 1 hidden');
        return createImage('img/img-2.jpg');
    })
    .then(img =>{
        currentImage = img;
        console.log(img, 'Image 2 loaded');
        return wait(2);
    })
    .then(() => {
        currentImage.style.display = 'none';
        console.log('Image 2 hidden');
    })
    .catch(err => console.error(err));
