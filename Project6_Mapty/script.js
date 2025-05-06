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

const renderMap = function (latitude, longitude) {
    const coords = [latitude, longitude];
    const map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
}


if (navigator.geolocation) {
    console.log('Geolocation is supported by this browser.');

    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Get the position coordinates via GPS using the Geolocation API
            const latitude = position.coords;
            const longitude = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            // Set the map with the coordinates
            renderMap(latitude, longitude);

        }, function (error) {
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
