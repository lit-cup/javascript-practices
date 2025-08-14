'use strict';

const btn = document.querySelector('.btn-country');
const countriseContainer = document.querySelector('.countries');

// Function to render error message
// This function is used to display an error message when something goes wrong
const renderError = function (msg) {
  countriseContainer.insertAdjacentText('beforeend', msg);
//   countriseContainer.style.opacity = 1;
}

// Function to render country data
// This function is used to display country information in the HTML
const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${Object.entries(data.languages)[0][1]}</p>
            <p class="country__row"><span>💰</span>${Object.entries(data.currencies)[0][1].name}</p>
        </div>
    </article>
  `;
  countriseContainer.insertAdjacentHTML('beforeend', html);
//   countriseContainer.style.opacity = 1;
}   

// // Example of AJAX request using XMLHttpRequest
// const getCountryAndNeighbour = function (country) {
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);

//     // Render country
//     renderCountry(data);

//     // Get neighbour country with callback again inside, this may lead to callback hell
//     const [neighbour] = data.borders;
//     if (!neighbour) return;
//     // Request neighbour country
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//         const [data2] = JSON.parse(this.responseText);
//         renderCountry(data2, 'neighbour');
//     });
// });
// }
// getCountryAndNeighbour('usa');

// callback with priority is not a good practice
// It can lead to callback hell, making code hard to read and maintain.
// Instead, we can use Promises or async/await for better readability and error handling.

// callback hell simple example
/** 
setImmediate(() => {
    getCountryAndNeighbour('usa');
    setImmediate(() => {
        getCountryAndNeighbour('canada');
        setImmediate(() => {
            getCountryAndNeighbour('mexico');
            setImmediate(() => {
                getCountryAndNeighbour('brazil');
            },1000);
        },1000);
    },1000);
},1000);
*/

// Example of AJAX request using Fetch API
// const request = fetch('https://restcountries.com/v3.1/name/Taiwan');
// console.log(request); // This returns a Promise

// What are Promises?
// A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
// Promises are used to handle asynchronous operations in JavaScript, allowing us to write cleaner and more manageable code compared to callbacks.
// Promises have three states: pending, fulfilled, and rejected.

// Advantages of using Promises:
// 1. Better readability: Promises allow us to chain operations using `.then()` and `.catch()`, making the code more readable.
// 2. Error handling: Promises provide a way to handle errors using `.catch()`, which is cleaner than nested callbacks.
// 3. Avoiding callback hell: Promises help avoid deeply nested callbacks, making the code easier to maintain.

// Promises lifecycle:
// 1. Pending: The initial state, neither fulfilled nor rejected.
// 2. Fulfilled: The operation completed successfully, and the Promise has a resulting value.
// 3. Rejected: The operation failed, and the Promise has a reason for the failure (error).

// Example of consuming a Promise with Fetch API
// const getCountryData = function (country) {
//     // consuming promise successfully
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//         //console.log(response); 
//         return response.json();})
//     .then(data=>{
//         //console.log(data);
//         data.forEach(countryInfo => {
//             console.log(countryInfo.name.common);
//             if(country === countryInfo.name.common) {
//                 renderCountry(countryInfo);
//             }
//         });
//     });
// }
// getCountryData('Hong Kong');

// Example of Chaining Promises
// const getCountryData = function (country) {
//   // consuming promise successfully
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response =>{
//         if (!response.ok) {
//             throw new Error(`Country not found (${response.status})`);
//         }
//         return response.json();} 
//     ) 
//     .then(data=>{
//         for(const countryInfo of data) {
//             // check if the country matches
//             if(country === countryInfo.name.common) {
//                 renderCountry(countryInfo);
//             // Get neighbour country
//             const neighbour = countryInfo.borders?.[0];
//             if (!neighbour) return;
//             return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`); // Return the next fetch promise
//             }   
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Country not found (${response.status})`);
//         }
//         return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//         renderError(`Something went wrong🚨🚨: ${err.message}. Try again!`);
//     })
//     .finally(() => {
//         countriseContainer.style.opacity = 1;
//     });
//     // .then is used to handle the resolved value of the Promise, with the first .then handling the response and the second .then handling the data.
//     // .catch is used to handle errors in the entire chain
//     // .finally is used to execute code after the promise is settled, regardless of success or failure, it always runs no matter success or failure
// }

// Example of Throwing Errors Manually using throw new Error
// This is used to create a custom error message when something goes wrong
// It allows us to handle errors more gracefully and provide meaningful feedback to the user
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
}

const getCountryData = function (country) {
  // consuming promise successfully
    getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(data=>{
        for(const countryInfo of data) {
            // check if the country matches
            if(country === countryInfo.name.common) {
                renderCountry(countryInfo);
            // Get neighbour country
            const neighbour = countryInfo.borders?.[0];
            if (!neighbour) throw new Error('No neighbour found');
            return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`,`Country not found` ); // Return the next fetch promise
            }   
        }
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
        renderError(`Something went wrong🚨🚨: ${err.message}. Try again!`);
    })
    .finally(() => {
        countriseContainer.style.opacity = 1;
    });
    // .then is used to handle the resolved value of the Promise, with the first .then handling the response and the second .then handling the data.
    // .catch is used to handle errors in the entire chain
    // .finally is used to execute code after the promise is settled, regardless of success or failure, it always runs no matter success or failure
}
btn.addEventListener('click', function () {
    // getCountryData('Taiwan');
    // getCountryData('Taiwan');
    // getCountryData('USA');
    // getCountryData('Canada');
    // getCountryData('Mexico');
    // getCountryData('Brazil');
});

// Simple Promise Example
// This is a simple example of a Promise that simulates a lottery draw
// It resolves with a success message if the random number is greater than or equal to 0.5, otherwise it rejects with a failure message.
const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lottery draw is happening... 🏆');
    setTimeout(() => {
        if( Math.random() >= 0.5) {
            resolve('You WIN! 🎉');
        } else {
            reject('You lost! 😢');
        }
    }, 2000);
});
lotteryPromise
    .then(res => console.log(res))// This will log 'You WIN! 🎉' or 'You lost! 😢' based on the random number
    .catch(err => console.error(err)); // This will log the error message if the promise is rejected

// callback hell using promises same effect at line 64
const wait = function (seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
}
wait(1)
    .then(() => {
        console.log('1 second passed');
        return wait(1);
    })
    .then(() => {
        console.log('2 seconds passed');
        return wait(1);
    })
    .then(() => {
        console.log('3 seconds passed');
        return wait(1);
    })
    .then(() => {
        console.log('4 seconds passed');
        return wait(1);
    })
    .then(() => {
        console.log('5 seconds passed');
    })
    .catch(err => console.error(err));

// Define Promise fulfilled and rejected  with resolve() and reject()
// This is a simple example of a Promise that resolves after 2 seconds
Promise.resolve('Resolved From Format').then(res => {console.log(res);});
Promise.reject('Rejected From Format').catch(err => {console.error(err);});

// Example refactoring from calling Geolocation API to using Promises
// Originally, the Geolocation API called getCurrentPosition with a callback function
/**
 * navigator.geolocation.getCurrentPosition(
 *   position => console.log(position),
 *   err => console.error(err)
 * );
 * console.log('Getting position...'); // This will log immediately, not waiting for the geolocation API to respond
 */

// Refactored to use Promises
const getPostion = function(){
    return new Promise(function(resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        // position => resolve(position),
        // err => reject(err)
        // );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
// getPostion().then(pos => console.log(pos));
// Example of using the getPostion function, handling data via Geolocation API then fetching data from an API based on the position
// This function retrieves the user's current position and then fetches the country data based on that position
// It uses the Geolocation API to get the user's latitude and longitude, then uses that data to fetch the country information
// Finally, it renders the country information in the HTML
const whereAmI = function () {
    getPostion()
        .then(pos => {
            const {latitude: lat, longitude: lng} = pos.coords;
            return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        })
        .then(res => {
            if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
            return res.json();
        })
        .then(data =>{
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);
            return getJSON(`https://restcountries.com/v3.1/name/${data.country}`);
        })
        .then(data => {renderCountry(data[0]);})
        .catch(err => {
            console.error(`Something went wrong: ${err.message}`);
            renderError(`Something went wrong: ${err.message}`);
        });
}
btn.addEventListener('click', whereAmI);