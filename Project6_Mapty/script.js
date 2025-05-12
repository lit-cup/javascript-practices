'use strict';

const form = document.querySelector('.form');
const workform = document.querySelector('.work');
const errorMessage = document.querySelector('.error-message');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const inputEdit = document.querySelector('.edit__option');
const spanEdit = document.querySelector('.desc__edit');
const inputDelAll = document.querySelector('.edit__delAll');
const spanDelAll = document.querySelector('.desc__delAll');
const inputSort = document.querySelector('.edit__sort');
const spanSort = document.querySelector('.desc__sort');

// Tool class for the edit section
class Tool {
    #seleted = true;
    constructor(workout, inputEdit, inputDelAll, inputDelete, inputSort, inputShowAll, spanDelAll, spanDelete, spanEdit, spanSort, spanShowAll) {
        this.workout = workout;
        this.inputEdit = inputEdit;
        this.inputDelAll = inputDelAll;
        this.inputDelete = inputDelete;
        this.inputSort = inputSort;
        this.inputShowAll = inputShowAll;
        this.spanDelAll = spanDelAll;
        this.spanDelete = spanDelete;
        this.spanEdit = spanEdit;
        this.spanSort = spanSort;
        this.spanShowAll = spanShowAll;

        this.inputEdit.addEventListener('click', this.iconSwitch.bind(this));
        this.inputEdit.addEventListener('mouseover', () => this.showTip(spanEdit));
        this.inputEdit.addEventListener('mouseout', () => this.hideTip(spanEdit));

        this.inputDelAll.addEventListener('mouseover', () => this.showTip(spanDelAll));
        this.inputDelAll.addEventListener('mouseout', () => this.hideTip(spanDelAll));

        this.inputSort.addEventListener('mouseover', () => this.showTip(spanSort));
        this.inputSort.addEventListener('mouseout', () => this.hideTip(spanSort));

        this.inputShowAll.addEventListener('mouseover', () => this.showTip(spanShowAll));
        this.inputShowAll.addEventListener('mouseout', () => this.hideTip(spanShowAll));
    }
    getEditSelected() {
        return this.#seleted;
    }
    showTip(type) {
        type.style.display = 'block';
    }
    hideTip(type) {
        type.style.display = 'none';
    }
    iconSwitch() {
        if (this.#seleted && this.workout.length > 0) {
            this.inputEdit.src = './cancel.png';
            this.inputDelAll.style.display = 'block';
            document.querySelectorAll('.edit__delete').forEach(items => {
                items.style.opacity = 100;
                items.addEventListener('mouseover', () => this.showTip(this.spanDelete));
                items.addEventListener('mouseout', () => this.hideTip(this.spanDelete));
            });
            // check seleted
            this.#seleted = false;
        }
        else {
            this.inputEdit.src = './edit.png';
            this.inputDelAll.style.display = 'none';
            document.querySelectorAll('.edit__delete').forEach(items => {
                items.style.opacity = 0;
                items.addEventListener('mouseover', () => this.hideTip(this.spanDelete));
            });
            // check seleted
            this.#seleted = true;
        }
    }
};

class Workout {
    date = new Date();
    // using a unique id for each workout
    id = (Date.now() + '').slice(-10);

    click = 0;
    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
    clicks() {
        this.click++;
    }
}
class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence; // in steps/min
        this.calcPace();
        this._setDescription();
    }
    calcPace() {
        this.pace = this.duration / this.distance; // in min/km
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain; // in m
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60); // in km/h
        return this.speed;
    }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, run1.calcPace());
// console.log(cycling1, cycling1.calcSpeed());

class maptyApp {

    #map;
    #mapviewlevel = 13;
    #mapEvent;
    #workoutlocation;
    #workouts = [];
    #deleteWork;
    #tool;
    #markers = [];
    #isMinisize = false;

    constructor() {
        // Get user's position
        this._getPosition();
        // Get user's localStorage
        this._getLocalStorage();

        this._setTool();
        this._setSidebar();

        // using bind because the private variable is not accessible in the event handler
        form.addEventListener('submit', this._newWorkout.bind(this));

        inputType.addEventListener('change', () => this._toggleElevationField());

        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

        // sort workout by distance
        inputSort.addEventListener('click', this._sortDistance.bind(this));

        // delAll workout with timeout
        inputDelAll.addEventListener('click', () => setTimeout(() => (this.resetWorkout().bind(this)), 800));

        // show all workouts
        document.querySelector('.edit__showAll').addEventListener('click', this._fitMapToWorkouts.bind(this));

        // to give all workout delete input eventlistener when loading website
        this.#deleteWork.forEach(work => {
            work.addEventListener('click', () => this._deleteWorkout(work.dataset.id));
        });
    }

    _setSidebar() {
        const logo = document.querySelector('.logo');
        logo.addEventListener('click', this._toggleSidebar.bind(this));
        // Initialize sidebar state
        this.#isMinisize = document.querySelector('.sidebar').classList.contains('minisize');
    }

    _toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('minisize');
        this.#isMinisize = !this.#isMinisize;
    }

    _isSidebarMinisize() {
        return this.#isMinisize;
    }

    _showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 3000);
    }
    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                error => {
                    this._showError('Could not get your location. Please Check location access.');
                }
            );
        } else {
            this._showError('Geolocation is not supported by your browser.');
        }
    }
    _loadMap(position) {
        // Get the position coordinates via GPS using the Geolocation API
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // Set the map with the coordinates
        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, this.#mapviewlevel);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        // handling the map click event
        this.#map.on('click', this._showForm.bind(this));

        this.#workouts.forEach(work => {
            this._pinMap(work);
        })

        // Fit map to show all workouts after loading
        this._fitMapToWorkouts();
    }
    _pinMap(workout) {
        // Display marker on the map
        const marker = L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`
                })
            )
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup();
        
        // Store marker reference
        this.#markers.push(marker);
        
        // Fit map to show all markers
        this._fitMapToWorkouts();
    }
    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();

        // Expand sidebar if it's in minisize mode
        if (this._isSidebarMinisize()) {
            this._toggleSidebar();
        }
    }
    _toggleElevationField() {
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    }
    _newWorkout(e) {
        // check if the input is finite or not
        const validInput = (...inputs) =>
            inputs.every(input => Number.isFinite(input));

        const positiveInput = (...inputs) =>
            inputs.every(input => input > 0);

        e.preventDefault();

        // Get data from the form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        // if workout is running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
            if (!validInput(distance, duration, cadence) ||
                !positiveInput(distance, duration, cadence)) {
                this._showError('Please enter valid positive numbers for all fields');
                return;
            }
            workout = new Running([lat, lng], distance, duration, cadence);
        }
        // if workout is cycling, create cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            if (!validInput(distance, duration, elevation) ||
                !positiveInput(distance, duration)) {
                this._showError('Please enter valid positive numbers for all fields');
                return;
            }
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add new object to the workouts array
        // console.log(workout.pace);
        this.#workouts.push(workout);

        // Render workout on the list
        this._renderWorkout(workout);

        // clear the input fields hide the form
        this._hideForm();

        // display the form
        this._pinMap(workout);

        // active delete input for new workout
        document.querySelector('.edit__delete').addEventListener('click', () => this._deleteWorkout(workout.id));

        // Set local storage to all workot
        this._setLocalStorage();
    }
    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);
    }
    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <input class="edit edit__delete" data-id="${workout.id}" style="opacity: 0;" type="image" src="./delete.png" alt="delete" width="30" height="30">
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
        `;
        if (workout.type === 'running') {
            html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
            </div>
          </li>`;
        }

        if (workout.type === 'cycling') {
            html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⛰</span>
              <span class="workout__value">${workout.elevationGain}</span>
              <span class="workout__unit">m</span>
            </div>
          </li>`;


        }
        workform.insertAdjacentHTML('afterbegin', html);
    }
    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        if (!workoutEl) return;
        this.#workoutlocation = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        
        if (this._isSidebarMinisize()) {
            this._toggleSidebar();
        }

        this.#map.setView(this.#workoutlocation.coords, this.#mapviewlevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        });
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }
    _getLocalStorage() {

        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return;

        this.#workouts = data;

        this.#workouts.forEach(work => {
            let workIdTemp = work.id;
            // if workout is running, create running object
            if (work.type === 'running') {
                work = new Running(work.coords, work.distance, work.duration, work.cadence);
                work.id = workIdTemp;
            }
            // if workout is cycling, create cycling object
            if (work.type === 'cycling') {
                work = new Cycling(work.coords, work.distance, work.duration, work.elevationGain);
                work.id = workIdTemp;
            }
            this._renderWorkout(work);
            // this._pinMap(work); we don't set this because this.#map doesn't defined at this part, so we need to put it when map loaded
        })

        // fix reloading type problem
        inputType.value = 'running';
    }
    _setTool() {
        // active tool option
        const inputDelete = document.querySelector('.edit__delete');
        this.#deleteWork = document.querySelectorAll('.edit__delete');
        const spanDelete = document.querySelector('.desc__delete');
        const inputShowAll = document.querySelector('.edit__showAll');
        const spanShowAll = document.querySelector('.desc__showAll');
        // using Tool class
        this.#tool = new Tool(
            this.#workouts, 
            inputEdit, 
            inputDelAll, 
            inputDelete, 
            inputSort,
            inputShowAll,
            spanDelAll, 
            spanDelete, 
            spanEdit, 
            spanSort,
            spanShowAll
        );
    }
    _sortDistance() {
        if (this.#workouts.length > 0) {
            workform.innerHTML='';
            this.#workouts
            .sort((a, b) => a.distance - b.distance)
            .forEach(work=> this._renderWorkout(work));
            this._setLocalStorage();
        }
    }
    _deleteWorkout(work) {
        // to check edit selected
        if (!this.#tool.getEditSelected()) {
            // Find and remove the item from the array with data-id element
            const index = this.#workouts.findIndex(item => item.id === work);
            // remove 1 index 
            this.#workouts.splice(index, 1);

            // Remove marker from map
            const markerIndex = this.#markers.findIndex(marker => 
                marker.getLatLng().lat === this.#workouts[index].coords[0] && 
                marker.getLatLng().lng === this.#workouts[index].coords[1]
            );
            if (markerIndex !== -1) {
                this.#map.removeLayer(this.#markers[markerIndex]);
                this.#markers.splice(markerIndex, 1);
            }

            // init map、localStorage
            this._getPosition();
            this.resetWorkout();
            this._setLocalStorage();
        }
    }

    resetWorkout() {
        // Remove all markers from map
        this.#markers.forEach(marker => this.#map.removeLayer(marker));
        this.#markers = [];
        
        localStorage.removeItem('workouts');
        location.reload();
    }

    _fitMapToWorkouts() {
        // Only toggle sidebar if it's not already in minisize mode
        if (!this._isSidebarMinisize()) {
            this._toggleSidebar();
        }
        
        if (this.#markers.length === 0) return;
        
        const bounds = L.latLngBounds(this.#markers.map(marker => marker.getLatLng()));
        this.#map.fitBounds(bounds, {
            padding: [100, 100],
            maxZoom: 15
        });
    }
}
const app = new maptyApp();

