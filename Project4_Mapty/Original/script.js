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
const inputShowAll = document.querySelector('.edit__showAll');
const spanShowAll = document.querySelector('.desc__showAll');

// Tool class for the edit section
// Model
class ToolUI {
  #seleted = true;
  constructor(
    workout,
    inputEdit,
    inputDelAll,
    inputSort,
    inputShowAll,
    spanDelAll,
    spanDelete,
    spanEdit,
    spanSort,
    spanShowAll
  ) {
    this.workout = workout;
    this.inputEdit = inputEdit;
    this.inputDelAll = inputDelAll;
    this.inputSort = inputSort;
    this.inputShowAll = inputShowAll;
    this.spanDelete = spanDelete;
    this.spanEdit = spanEdit;
    this.spanSort = spanSort;
    this.spanShowAll = spanShowAll;

    this.inputEdit.addEventListener('click', () => this.iconSwitch());
    this.inputEdit.addEventListener('mouseover', () => this.showTip(spanEdit));
    this.inputEdit.addEventListener('mouseout', () => this.hideTip(spanEdit));

    this.inputDelAll.addEventListener('mouseover', () =>
      this.showTip(spanDelAll)
    );
    this.inputDelAll.addEventListener('mouseout', () =>
      this.hideTip(spanDelAll)
    );

    this.inputSort.addEventListener('mouseover', () => this.showTip(spanSort));
    this.inputSort.addEventListener('mouseout', () => this.hideTip(spanSort));

    this.inputShowAll.addEventListener('mouseover', () =>
      this.showTip(spanShowAll)
    );
    this.inputShowAll.addEventListener('mouseout', () =>
      this.hideTip(spanShowAll)
    );
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
  setEditOpen() {
    this.inputEdit.src = './cancel.png';
    this.inputDelAll.style.display = 'block';
    document.querySelectorAll('.edit__delete').forEach(items => {
      items.style.opacity = 1;
      items.addEventListener('mouseover', () => this.showTip(this.spanDelete));
      items.addEventListener('mouseout', () => this.hideTip(this.spanDelete));
    });
    // check seleted
    this.#seleted = false;
  }
  setEditClose() {
    this.inputEdit.src = './edit.png';
    this.inputDelAll.style.display = 'none';
    document.querySelectorAll('.edit__delete').forEach(items => {
      items.style.opacity = 0;
      items.addEventListener('mouseover', () => this.hideTip(this.spanDelete));
      items.addEventListener('mouseout', () => this.hideTip(this.spanDelete));
      // check seleted
      this.#seleted = true;
    });
  }
  iconSwitch() {
    if (this.#seleted && this.workout.length > 0) {
      this.setEditOpen();
    } else {
      this.setEditClose();
    }
  }
  updateWorkouts(workouts) {
    this.workout = workouts;
  }
}
// view
class Workout {
  date = new Date();
  // using a unique id for each workout
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

// view
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

// view
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
// control
class maptyApp {
  #map;
  #mapviewlevel = 13;
  #mapEvent;
  #workouts = [];
  #tool;
  #routes = [];
  #routingControls = [];
  #markers = [];
  #marker1;
  #marker2;
  #isMinisize = false;
  #mapLoaded = false;
  #mapLoadPromise;

  constructor() {
    // using Promise to chicking if map is loaded
    this.#mapLoadPromise = new Promise(resolve => {
      this._resolveMapLoad = resolve;
    });

    // Get user's position by _loadMap()
    this._getPosition();

    // load event listener
    this._addEventListener();
  }
  _addEventListener() {
    // Use _newWorkout() to handle form submit event
    form.addEventListener('submit', this._newWorkout.bind(this));

    // Use _toggleElvationField() to handle when form's type change event
    inputType.addEventListener('change', () => this._toggleElevationField());

    // Use _moveToPopup() to handle form's item click event
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    // Use _sortDistance() to handle tool's sort click event
    inputSort.addEventListener('click', this._sortbyDistance.bind(this));

    // Use setTimeout() && resetWorkout() to handle tool's delete-all click event
    inputDelAll.addEventListener('click', () => this._deleteAllWithDelay());

    // Use _fitMapToWorkouts() to handle tool's show-all click event
    inputShowAll.addEventListener('click', this._fitMapToWorkouts.bind(this));
  }
  _deleteAllWithDelay() {
    setTimeout(() => this.resetWorkout(), 1000);
  }
  // model
  _setSidebar() {
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', this._toggleSidebar.bind(this));
    // Initialize sidebar state
    this.#isMinisize = document
      .querySelector('.sidebar')
      .classList.contains('minisize');
  }
  // model
  _toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('minisize');
    this.#isMinisize = !this.#isMinisize;
  }
  // model
  _isSidebarMinisize() {
    return this.#isMinisize;
  }
  // view
  _showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
      errorMessage.classList.add('hidden');
    }, 3000);
  }
  // model
  _isMapLoaded() {
    return this.#mapLoaded && this.#map instanceof L.Map;
  }
  // model
  async waitForMapLoad() {
    await this.#mapLoadPromise;
  }
  // model
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        this._showError(
          'Could not get your location. Please Check location access.'
        );
      });
    } else {
      this._showError('Geolocation is not supported by your browser.');
    }
  }
  // model
  _loadMap(position) {
    try {
      this._initMap(position);
      // Get user's localStorage and _renderWorkout(work)
      this._getLocalStorage();
      // set tools : delete、delete-all、edit、cancel、show-all、sort、tooltips、icon switch handler
      this._setToolUIManger();

      // handling the map click event
      // this.#map.on('click', this._showForm.bind(this));
      this.#map.once('click', this._showRouteAndPan.bind(this));
    } catch (e) {
      console.error('Failed to initialize map:', e);
      this._showError('Map initialization failed. Please refresh the page.');
    }
  }
  _initMap(position) {
    // Get the position coordinates via GPS using the Geolocation API
    const { latitude, longitude } = position.coords;
    // Set the map with the coordinates
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapviewlevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // load map
    this.#mapLoaded = true;

    this._resolveMapLoad();
  }
  // model
  _pinMap(workout) {
    if (!this._isMapLoaded()) {
      console.warn('Cannot pin map: Map is not loaded.');
      return;
    }
    // Display marker on the map
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup()
      .on('click', () => this.#map.panTo(workout.coords));

    // Store marker reference
    this.#markers.push(marker);
  }
  // model
  _getRouteAndPan() {
    if (!this._isMapLoaded()) {
      console.warn('Cannot pin map: Map is not loaded.');
      return;
    }
    try {
      const savedData = JSON.parse(localStorage.getItem('route'));
      if (savedData) {
        this.#routes = savedData;
        savedData.forEach((data, index) => {
          // Validate each route's data structure
          if (
            data.workoutId &&
            data.marker1 &&
            data.marker2 &&
            typeof data.marker1.lat === 'number' &&
            typeof data.marker1.lng === 'number' &&
            typeof data.marker2.lat === 'number' &&
            typeof data.marker2.lng === 'number'
          ) {
            // Create markers
            const marker1 = L.marker([
              data.marker1.lat,
              data.marker1.lng,
            ]).addTo(this.#map);
            const marker2 = L.marker([
              data.marker2.lat,
              data.marker2.lng,
            ]).addTo(this.#map);

            this.#markers.push(marker1, marker2);

            // Draw route
            const routingControl = L.Routing.control({
              waypoints: [
                L.latLng(data.marker1.lat, data.marker1.lng),
                L.latLng(data.marker2.lat, data.marker2.lng),
              ],
              lineOptions: { styles: [{ color: 'red', weight: 4 }] },
              router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1',
              }),
              createMarker: () => null,
              addWaypoints: false,
              routeWhileDragging: false,
              fitSelectedRoutes: false,
            })
              .on('routesfound', e => {
                const routeDistanceKm = (
                  e.routes[0].summary.totalDistance / 1000
                ).toFixed(2);
                L.popup({
                  maxWidth: 250,
                  minWidth: 100,
                  autoClose: false,
                  closeOnClick: false,
                })
                  .setLatLng([data.marker2.lat, data.marker2.lng])
                  .setContent(`Route ${index + 1}: ${routeDistanceKm} km`)
                  .openOn(this.#map);
                if (this._isSidebarMinisize()) {
                  this._toggleSidebar();
                }
              })
              .addTo(this.#map);

            this.#routingControls.push(routingControl);
          }
        });
      } else {
        console.warn(`Invalid route data at index ${index}:`, data);
      }
    } catch (e) {
      console.error('Failed to parse localStorage data:', e);
      localStorage.removeItem('route');
    }
  }
  // model
  _showRouteAndPan(mapE) {
    if (!this._isMapLoaded()) {
      console.warn('Cannot pin map: Map is not loaded.');
      return;
    }
    this.#mapEvent = mapE;
    // Listen for first click
    this.#marker1 = L.marker(mapE.latlng)
      .addTo(this.#map)
      .bindPopup('Start')
      .openPopup();
    this.#markers.push(this.#marker1); // Track in #markers
    // Listen for second click
    this.#map.once('click', e => {
      this.#marker2 = L.marker(e.latlng)
        .addTo(this.#map)
        .bindPopup('End')
        .openPopup();
      this.#markers.push(this.#marker2); // Track in #markers
      this._setRouteAndPan(); // Draw route after second click
    });
  }
  // model
  _setRouteAndPan() {
    if (!this._isMapLoaded()) {
      console.warn('Cannot pin map: Map is not loaded.');
      return;
    }

    form.classList.remove('hidden');
    inputDistance.focus();

    const routingControl = L.Routing.control({
      waypoints: [this.#marker1._latlng, this.#marker2._latlng],
      lineOptions: { styles: [{ color: 'red', weight: 4 }] },
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      createMarker: () => null,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: false,
    })
      .on('routesfound', e => {
        const routeDistanceKm = (
          e.routes[0].summary.totalDistance / 1000
        ).toFixed(2);

        // set view to the full markers
        const bounds = L.latLngBounds([
          this.#marker1._latlng,
          this.#marker2._latlng,
        ]);
        e.routes[0].coordinates.forEach(coord =>
          bounds.extend([coord.lat, coord.lng])
        );

        if (bounds.isValid()) {
          this.#map.fitBounds(bounds, { padding: [100, 100], maxZoom: 15 });
        }
        // Show distances in popup
        L.popup()
          .setLatLng(this.#marker2._latlng)
          .setContent(`Route: ${routeDistanceKm} km`)
          .openOn(this.#map);

        // set Distance
        inputDistance.value = routeDistanceKm;
        // Expand sidebar if it's in minisize mode
        if (this._isSidebarMinisize()) {
          this._toggleSidebar();
        }
      })
      .on('routingerror', e => {
        console.error('Routing failed:', e.error.message);
        this._showError('Could not calculate route.');
        form.classList.add('hidden');
        this.#map.once('click', this._showRouteAndPan.bind(this));
      })
      .addTo(this.#map);

    this.#routingControls.push(routingControl);
  }
  // mmodel
  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }
  // model
  _newWorkout(e) {
    e.preventDefault();

    // check if the input is finite or not
    const validInput = (...inputs) =>
      inputs.every(input => Number.isFinite(input));
    const positiveInput = (...inputs) => inputs.every(input => input > 0);

    // Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // if workout is running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !validInput(distance, duration, cadence) ||
        !positiveInput(distance, duration, cadence)
      ) {
        this._showError('Please enter valid positive numbers for all fields');
        return;
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // if workout is cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInput(distance, duration, elevation) ||
        !positiveInput(distance, duration)
      ) {
        this._showError('Please enter valid positive numbers for all fields');
        return;
      }
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to the workouts array
    this.#workouts.push(workout);
    this.#routes.push({
      workoutId: workout.id,
      marker1: {
        lat: this.#marker1._latlng.lat,
        lng: this.#marker1._latlng.lng,
      },
      marker2: {
        lat: this.#marker2._latlng.lat,
        lng: this.#marker2._latlng.lng,
      },
    });

    // Render workout on the list
    this._renderWorkout(workout);
    // clear the input fields hide the form
    this._hideForm();
    // display the form
    this._pinMap(workout);

    // active delete input for new workout
    document
      .querySelector('.edit__delete')
      .addEventListener('click', () => this._deleteWorkout(workout.id));

    // Set local storage to all workot
    this._setLocalStorage();
    localStorage.setItem('route', JSON.stringify(this.#routes));

    this.#map.once('click', this._showRouteAndPan.bind(this));

    // Only toggle sidebar if it's not already in minisize mode
    if (!this._isSidebarMinisize()) {
      this._toggleSidebar();
    }
  }
  // view
  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  // view
  _renderWorkout(workout) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <input class="edit edit__delete" data-id="${
            workout.id
          }" style="opacity: 0;" type="image" src="./delete.png" alt="delete" width="30" height="30">
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
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

    const deleteBtn = workform.querySelector(
      `.edit__delete[data-id="${workout.id}"]`
    );
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () =>
        this._deleteWorkout(workout.id)
      );
    }
  }
  // control
  _moveToPopup(e) {
    // Ignore clicks on delete buttons
    if (
      e.target.classList.contains('edit__delete') ||
      e.target.closest('.edit__delete')
    ) {
      return;
    }
    if (!this._isMapLoaded()) return;

    // find correct html form's data with workout array data by id
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // check if sidebar is minisize then toggle sidebar open/close
    if (!this._isSidebarMinisize()) {
      this._toggleSidebar();
    }
    if (!workout) return;
    // find correct route data with right html form&workout data
    const route = this.#routes.find(route => route.workoutId === workout.id);
    if (!route) {
      this.#map.panTo(workout.coords);
      return;
    }

    // using latLngBounds() mix to location
    const bounds = L.latLngBounds([route.marker1, route.marker2]);
    // set view
    this.#map.fitBounds(bounds, { padding: [100, 100], maxZoom: 15 });
  }
  // model
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  // model
  _getLocalStorage() {
    if (!this._isMapLoaded()) {
      console.warn('Cannot load workouts: Map is not loaded.');
      return;
    }

    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;

    this.#workouts = data.map(work => {
      const workIdTemp = work.id;

      // if workout is running, create running object
      if (work.type === 'running') {
        work = new Running(
          work.coords,
          work.distance,
          work.duration,
          work.cadence
        );
      } else if (work.type === 'cycling') {
        work = new Cycling(
          work.coords,
          work.distance,
          work.duration,
          work.elevationGain
        );
      }
      work.id = workIdTemp;
      return work;
      // this._pinMap(work); we don't set this because this.#map doesn't defined at this part, so we need to put it when map loaded
    });

    // Get user's routing history by localstorage
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      this._pinMap(work);
    });

    // fix reloading type problem
    inputType.value = 'running';
    this._getRouteAndPan();
  }
  // model
  _setToolUIManger() {
    if (!this._isMapLoaded()) {
      console.warn('Cannot set tools: Map is not loaded.');
      return;
    }
    // // active tool option
    const spanDelete = document.querySelector('.desc__delete');

    // using Tool class
    this.#tool = new ToolUI(
      this.#workouts,
      inputEdit,
      inputDelAll,
      inputSort,
      inputShowAll,
      spanDelAll,
      spanDelete,
      spanEdit,
      spanSort,
      spanShowAll
    );

    this._setSidebar();
  }
  // model
  _sortbyDistance() {
    if (this.#workouts.length > 0) {
      workform.innerHTML = '';
      this.#workouts
        .sort((a, b) => a.distance - b.distance)
        .forEach(work => this._renderWorkout(work));
      this._setLocalStorage();
    }
  }
  // control
  _deleteWorkout(selectedWorkId) {
    if (!this._isMapLoaded()) return;
    if (!this.#tool.getEditSelected()) {
      const indexWork = this.#workouts.findIndex(
        item => item.id === selectedWorkId
      );
      if (indexWork === -1) return;

      // Store workout coords and route before splicing
      const workoutCoords = this.#workouts[indexWork].coords;
      const indexRoute = this.#routes.findIndex(
        route => route.workoutId === selectedWorkId
      );
      let routeMarkers = [];
      if (indexRoute !== -1) {
        const route = this.#routes[indexRoute];
        routeMarkers = [
          { lat: route.marker1.lat, lng: route.marker1.lng },
          { lat: route.marker2.lat, lng: route.marker2.lng },
        ];
      }

      // Remove workout
      this.#workouts.splice(indexWork, 1);

      // Remove route and routing control
      if (indexRoute !== -1) {
        this.#routes.splice(indexRoute, 1);
        if (this.#routingControls[indexRoute]) {
          this.#map.removeControl(this.#routingControls[indexRoute]);
          this.#routingControls.splice(indexRoute, 1);
        }
      }

      // Remove all related markers
      const markersToRemove = this.#markers.filter(marker => {
        const latlng = marker._latlng;
        return (
          // Workout marker
          (latlng.lat === workoutCoords[0] &&
            latlng.lng === workoutCoords[1]) ||
          // Route start/end markers
          routeMarkers.some(
            rm => latlng.lat === rm.lat && latlng.lng === rm.lng
          )
        );
      });
      markersToRemove.forEach(marker => {
        this.#map.removeLayer(marker);
      });
      this.#markers = this.#markers.filter(m => !markersToRemove.includes(m));

      // Remove temporary markers if they match the deleted route
      if (this.#marker1 && this.#marker2 && indexRoute !== -1) {
        const route = this.#routes[indexRoute] || { marker1: {}, marker2: {} };
        if (
          (this.#marker1._latlng.lat === route.marker1?.lat &&
            this.#marker1._latlng.lng === route.marker1?.lng) ||
          (this.#marker2._latlng.lat === route.marker2?.lat &&
            this.#marker2._latlng.lng === route.marker2?.lng)
        ) {
          this.#map.removeLayer(this.#marker1);
          this.#map.removeLayer(this.#marker2);
          this.#marker1 = this.#marker2 = null;
        }
      }
      // Re-render workouts
      workform.innerHTML = '';
      this.#workouts.forEach(work => this._renderWorkout(work));
      // Update local storage
      this._setLocalStorage();
      localStorage.setItem('route', JSON.stringify(this.#routes));

      // Update Tool instance
      this.#tool.updateWorkouts(this.#workouts);
      this.#tool.setEditClose();
      // fixed sometimes display change doesn't work
      document.querySelector('.desc__delete').style.display = 'none';
    }
  }
  // view
  resetWorkout() {
    if (!this._isMapLoaded()) return;

    // Remove all markers from map
    this.#markers.forEach(marker => this.#map.removeLayer(marker));
    this.#markers = [];

    this.#routingControls.forEach(control => this.#map.removeControl(control));
    this.#routingControls = [];

    this.#workouts = [];
    this.#routes = [];

    localStorage.removeItem('route');
    localStorage.removeItem('workouts');

    workform.innerHTML = '';
    this.#map.closePopup();
    this.#map.off('click');
    this.#marker1 = this.#marker2 = null;

    this.#tool.updateWorkouts(this.#workouts);
    this.#tool.setEditClose();
  }
  // control
  _fitMapToWorkouts() {
    if (!this._isMapLoaded() || this.#markers.length === 0) return;
    // Only toggle sidebar if it's not already in minisize mode
    if (!this._isSidebarMinisize()) {
      this._toggleSidebar();
    }

    const bounds = L.latLngBounds(this.#markers.map(marker => marker._latlng));
    this.#map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: this.#mapviewlevel,
    });
  }
}

const app = new maptyApp();

// TODO
/**
 * draw line loading bug fix  | done
 * this.#routes array refresh error  | done
 * button couldn't click fix  | done
 * test everything is okay
 *  click form's items view fix | done
 * loading routing focus on every routing problem after fix this future keep learning after section | done
 */
