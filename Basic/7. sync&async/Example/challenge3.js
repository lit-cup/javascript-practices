// challenge3.js
// Part 1 - create loadPause function to Rewrite Challenge #2 using async/await
// Part 2
// create a function 'loadAll' that receives an array of image paths
// use .map to loop over the array, to load all the images with the createImage function
// checkout the 'imgs' variable in the console! is right as our think
// use a promise combinator function to actually get the images from the array
// and to add the 'parallel' class to all the images (check the CSS)

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
// let currentImage = null;
// createImage('img/img-1.jpg')
//     .then(img => {
//         currentImage = img;
//         console.log(img, 'Image 1 loaded');
//         return wait(2);
//     })
//     .then(() => {
//         currentImage.style.display = 'none';
//         console.log('Image 1 hidden');
//         return createImage('img/img-2.jpg');
//     })
//     .then(img =>{
//         currentImage = img;
//         console.log(img, 'Image 2 loaded');
//         return wait(2);
//     })
//     .then(() => {
//         currentImage.style.display = 'none';
//         console.log('Image 2 hidden');
//     })
//     .catch(err => console.error(err));
// Part 1
const loadNPause = async function() {
    try {
        let img = await createImage('img/img-1.jpg');
        console.log(img, 'Image 1 loaded');
        await wait(2);
        img.style.display = 'none';
        console.log('Image 1 hidden');

        img = await createImage('img/img-2.jpg');
        console.log(img, 'Image 2 loaded');
        await wait(2);
        img.style.display = 'none';
        console.log('Image 2 hidden');

        img = await createImage('img/img-3.jpg');
        console.log(img, 'Image 3 loaded');
        await wait(2);
        img.style.display = 'none';
        console.log('Image 3 hidden');
    }catch(err) {
        console.error(err);
    }
};
//loadNPause();


// the difference between promise chaining and async/await is that
// promise chaining need to return the promise in each then() to chain the next then()
// async/await make the code look more like synchronous code and easier to read
// but still asynchronous under the hood


// Part 2
const loadall = async function(imgs) {
    try {
        // below is paralle loading solution
        // use the path we input to apply all image paths from img floder files by createImage function
        const imgsData = imgs.map(async (imgPath) => await createImage(imgPath));
        console.log(imgsData);
        
        // use Promise.all to get all the images from the array of every promises
        const imgElements = await Promise.all(imgsData);
        console.log(imgElements);
        
        // add 'parallel' class to all the images
        imgElements.forEach(img => img.classList.add('parallel'));

        // below is a sequential loading slution
        // imgs.map(imgPromise => 
        //     imgPromise.then(img => {
        //         console.log(img);
        //         img.classList.add('parallel');
        //         return wait(1); 
        // })); 
    } catch(err) {
        console.error(err);
    }
}
// inptut array of image paths
loadall(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// when to using parallel vs sequential loading ??

// use sequential 
// when the order of loading matters and have dependence on each other
// e.g. step by step instruction, tutorial, cooking recipe etc

// use parallel 
// when the order of loading does not matter and have no dependence on each other
// e.g. image gallery, video gallery, article list etc

// and our purpose want to load all the resources as fast as possible

// async/await(handle) v.s. Promise chaining(implement) ??
// when asynchronous function -> use Promise chaining
// then use async/await in upper level function to handle the returned promise from the asynchronous function

// Simplified explain from above
// createImage(...) this is a tool function and we using promise chaining
// loadNPause() this is a higher level function and we using async/await to handle the returned promise
// loadAll() this is also a higher level function and we using async/await to handle the returned promise

// Promise and async/awit is Syntactic sugar

// -------------------------------------------------------
// when to use async/await?

// write when we need to use [await] to wait for a promise to resolve before moving on to the next line of code.
// that is transfroming asynchronous code into synchronous code etc. promise chaining.
// to control the flow of asynchronous code more easily, using [async] funtion handle.

// 1. to write cleaner code
// 2. to handle multiple promises in a more readable way
// 3. to avoid callback hell
// 4. to write asynchronous code that looks like synchronous code

// Example use cases

// 1. wait a promise
// async function loadData() {
//    const data = await fetch('https://api.example.com/data');
//    console.log(data);
// }

// 2. wait promise recevies value
// async function laodJson(){
//    const res = await getJSON('https://api.example.com/data.json');
//    const json = await res.json();
//    console.log(json);
// }

// 3. try/catch for error handling
// async function loadSafe() {
//   try {
//     const res = await fetch('https://api.example.com/data');
//     return await res.json();
//   } catch (err) {
//     console.error('Oops:', err);
//   }
// }

// 4. multiple await but sequentially use to dependency flow
// async function loadUserFlow() {
//   const user = await getUser();  
//   const posts = await getPosts(user.id);  
//   const comments = await getComments(posts[0].id);  
//   return comments;
// }

// 5. parallel await use when no dependency flow, modern solution
// async function loadParallel() {
//   const p1 = fetch(url1);
//   const p2 = fetch(url2);
//   const p3 = fetch(url3);

//   const [a, b, c] = await Promise.all([p1, p2, p3]);
//   return [a, b, c];
// }

// 6. forech vs for-of loop with await/async
// urls.forEach(async url => {
//   await fetch(url);
// });
// above code will not work as expected because forEach does not wait for the async function to complete
// for (const url of urls) {
//   const res = await fetch(url);
// }
// above code will work as expected because for-of loop waits for the async function to complete

// 7. async mutiple functions loading useful when need to load mutiple resources
// const urls = ['url1', 'url2', 'url3'];
// const promises = urls.map(url => fetch(url));
// const results = await Promise.all(promises);

// 8. sequential way using for-of loop 
// for (const url of urls) {
//   const res = await fetch(url);
//   console.log('Loaded:', url);
// }

// 9. async funtion return a promise 

// 10. use new Promise() int a async funtion when need to wrap a asynchronous operation in a promise
// function wait(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function demo() {
//   await wait(1000);
//   console.log('done');
// }

// other notes write with error handling
// async function getUser() {
//   const res = await fetch('/user');
//   if (!res.ok) throw new Error('User not found');
//   return res.json();
// }

//-------------------------------------------------------
// Summary
// where we need to handle promises -> await
// where we need to create asynchronous flow -> new Promise
// put flow control in the outermost async function
// multiple tasks at the same time -> Promise.all
// loops that need await -> for-of, not forEach