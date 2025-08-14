'use strict';
// simple challenge to trying out fetch API for reverse geocoding, base on renderCountry method, use bigdatacloud API for reverse geocoding and restcountries API for country data

// 1. create a function `whereAmI` that takes latitude and longitude as arguments
// 2. use the fetch API to get the location data from a reverse geocoding service
// 3. log the city and country name to the console
// 4. handle errors appropriately
// 5. use the fetch API to get country data from a country API
// 6. render the country data in the HTML
// 7. handle errors appropriately


const countriseContainer = document.querySelector('.countries');

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
const whereAmI = function(lat, lng){
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    .then(res => {
        if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
        return res.json();
    })
    .then(data => {
        console.log(data);
        console.log(`You are in ${data.city}, ${data.countryName}`);
        return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(res =>{
        if(!res.ok) throw new Error(`Problem with country data ${res.status}`);
        return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`))
}
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);