'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;


const pinMap = (map, mapEvent) => {
    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            })
        )
        .setPopupContent('Workout')
        .openPopup();
}


const renderMap = (latitude, longitude) => {
    const coords = [latitude, longitude];
    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // handling the map click event
    map.on('click', mapE => {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
        //pinMap(map, mapEvent);
    });

}


if (navigator.geolocation) {
    console.log('Geolocation is supported by this browser.');

    navigator.geolocation.getCurrentPosition(
        position => {
            // Get the position coordinates via GPS using the Geolocation API
            const latitude = position.coords;
            const longitude = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            // Set the map with the coordinates
            renderMap(latitude, longitude);

        }, error => {
            console.log('Could not get location by GPS: ', error.message);
            // https://www.google.com/maps/@23.4938181,120.4367907,15.79z

            // Fallback to IP geolocation by using a third-party API
            // https://ipapi.co/json/
            fetch('https://ipapi.co/json/')
                .then(response => response.json())
                .then(locationData => {
                    console.log(`City: ${locationData.city}, Lat: ${locationData.latitude}, Lon: ${locationData.longitude}`);
                    renderMap(locationData.latitude, locationData.longitude);
                })
                .catch(error => console.error('IP Geolocation Error:', error));
        })
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    // clear the input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    // display the form
    pinMap(map, mapEvent);
});

inputType.addEventListener('change', function () {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});