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


class maptyApp {

    #map;
    #mapEvent;

    constructor() {
        this._getPosition();
        // using bind because the private variable is not accessible in the event handler
        form.addEventListener('submit', this._newWorkout.bind(this));

        inputType.addEventListener('change', this._toggleElevationField);
    }
    _getPosition() {
        if (navigator.geolocation) {
            console.log('Geolocation is supported by this browser.');

            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                error => {
                    console.log('Could not get location by GPS: ', error.message);
                })
        };
    }
    _loadMap(position) {
        // Get the position coordinates via GPS using the Geolocation API
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // Set the map with the coordinates
        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        // handling the map click event
        this.#map.on('click', this._showForm.bind(this));
    }
    _pinMap(map, mapEvent) {
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
    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    _newWorkout(e) {
        e.preventDefault();
        // clear the input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        // display the form
        this._pinMap(this.#map, this.#mapEvent);
    }
}

const app = new maptyApp();

