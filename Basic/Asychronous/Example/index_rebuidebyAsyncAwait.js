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
    } catch(err) {
        console.error(`${err} 🚨`);
        renderError(`🚨 ${err.message}`);
    }
}
// await keep funtion active before end
whereAmI();
console.log('First');

// Simple try catch sample
// try{
//     let y =1;
//     const x =2;
//     x =3;
// }catch(err){
//     console.log(err.message);
// }