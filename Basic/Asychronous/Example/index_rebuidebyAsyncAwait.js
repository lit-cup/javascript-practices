// This function is used to display country information in the HTML
const countriseContainer = document.querySelector('.countries');

// Refactored to use Promises
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

const whereAmI = async function (){
    // Geolocation
    const pos = await getPostion();
    const {latitude: lat, longitude: lng} = pos.coords;
    
    // Reverse geocoding
    const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);
    
    // Country data 
    // fetch(`https://restcountries.com/v3.1/name/${country}`)
    // .then(response =>  response.json()); 
    const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.countryCode}`)
    const data = await res.json();
    renderCountry(data[0]);
}
// await keep funtion active before end
whereAmI();
console.log('First');