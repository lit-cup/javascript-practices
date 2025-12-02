// This function is used to display country information in the HTML
const countriseContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriseContainer.insertAdjacentText('beforeend', msg);
  countriseContainer.style.opacity = 1;
}

const getPostion = function(){
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

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
  countriseContainer.style.opacity = 1;
}   
// fetch(`https://restcountries.com/v3.1/name/${country}`)
// .then(response =>  response.json()); 
const whereAmI = async function (){
    try{
        // Geolocation
        const pos = await getPostion();
        const {latitude: lat, longitude: lng} = pos.coords;
        
        // Reverse geocoding
        const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        if(!resGeo.ok) throw new Error('Problem getting location data');
        const dataGeo = await resGeo.json();
        
        // Country data 
        const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.countryCode}`)
        if(!res.ok) throw new Error('Problem getting location country')
        const data = await res.json();
        renderCountry(data[0]);

        // async function return value
        return `You are in ${dataGeo.countryCode}, ${dataGeo.countryName}`
    } catch(err) {
        console.error(`${err} 🚨`);
        renderError(`🚨 ${err.message}`);

        // async function return error
        throw err;
    }
}
// await keep funtion active before synchronous done

// const city = whereAmI();
// console.log(city); //async function will return promise never you write what type of return
console.log('1: Will get location');

// Returnimg values from async functions need to use same method 
// .then() to get data, 
// .catch() to get error, 
// .finally() run never what here was to check if was run.
/////
// whereAmI()
//     .then(city=>console.log(`2: ${city}`))
//     .catch(err=> console.error(`2: ${err.message}`))
//     .finally(()=>console.log(`3: finished getiing location`));

// The way to async and handle async function returning value we using IIFEs pattern 
(async function(){
    try{
        const city = await whereAmI();
        console.log(`2: ${city}`);
    }catch(err){
        console.error(`2: ${err.message}`);
    }
    console.log(`3: finished getiing location`);
})();


// Simple try catch sample
// try{
//     let y =1;
//     const x =2;
//     x =3;
// }catch(err){
//     console.log(err.message);
// }

// Example 2:

// async function test() {
//   console.log('1');
//   await fetch('https://example.com');  // pretend this takes a while
//   console.log('2');
// }

// test();
// console.log('3');

// Output:

// 1
// 3
// 2

// Explain:
// Why?

// 1. test() starts → prints '1'.

// 2. It hits await fetch() → JS says “ok cool, I’ll wait for that promise”.

// 3. It pauses the async function here and moves on.

// 4. '3' prints — because synchronous code outside keeps going.

// 5. When the fetch finishes (the Promise resolves), '2' prints.

// So the function continues later, after the current synchronous code and after the awaited promise resolves.