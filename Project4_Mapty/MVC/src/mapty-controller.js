import * as model from './mapty-model.js';
import mapView from './view/mapView.js';
import formView from './view/formView.js';
import workoutView from './view/workoutView.js';
import Running from './model/running.js';
import Cycling from './model/cycling.js';
import { MAP_VIEW_LEVEL } from './view/config.js';
class Controller {
  init() {
    this._getPosition();
    // map click event: deferred binding
    mapView.setMapClickHandler(this._handleMapClick.bind(this));
    // form input type change event
    formView.addHandlerInputTypeChange();
    // map sumbit evnet
    formView.addHandlerMapSubmit(this._handleMapSubmit.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation) {
      // showError use arrow function because getCurrentPosition callback just listening error evnt once time
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        this._showError(
          'Could not get your location. Please Check location access.'
        );
      });
    } else {
      this._showError('Geolocation is not supported by your browser.');
    }
  }
  _loadMap(position) {
    // get latitude, longitude
    const { latitude, longitude } = position.coords;
    // transform to coord arrays
    const coords = [latitude, longitude];
    // new map set View
    const map = L.map('map').setView(coords, MAP_VIEW_LEVEL);
    // render default map by coord
    mapView.renderMap(map);
  }
  _handleMapSubmit() {
    try {
      // get form input
      const input = formView.getInput();
      // check input finite
      this._isInputFinite(input);
      // formatWorkout by difference type -> store in model
      model.addWorkout(this._formatTypeWorkout(input));
      // clear workout list before render
      workoutView.clear();
      // workouts list loop
      model.state.workouts.forEach(workout => {
        // render workout
        workoutView.render(workout);
        // render mark
        mapView.renderMarker(workout);
      });
      formView._toggleSidebar();
    } catch (error) {
      formView._renderError(error.message);
    }
  }
  _isInputFinite({ type, distance, duration, cadence, elevation }) {
    const valueToCheck = type === 'running' ? cadence : elevation;
    const value = [distance, duration, valueToCheck];
    const allFinite = value.every(val => Number.isFinite(val));
    const allPositive = value.every(val => val > 0);
    // finite error message
    if (!allFinite) throw new Error('Inputs must be numbers.');
    // positive error message
    if (!allPositive)
      throw new Error(
        type === 'running'
          ? 'Distance, duration and cadence must be positive numbers.'
          : 'Distance, duration and elevation must be positive numbers.'
      );
  }
  _formatTypeWorkout(input) {
    let newWorkout;
    // if workout is running, create running object
    if (input.type === 'running') {
      return (newWorkout = new Running(
        input.coords,
        input.distance,
        input.duration,
        input.cadence
      ));
    }
    if (input.type === 'cycling') {
      return (newWorkout = new Cycling(
        input.coords,
        input.distance,
        input.duration,
        input.elevation
      ));
    }
  }
  _handleMapClick(mapEvent) {
    // preview  mark and route by click location
    // mapViewRenderPreviewSingle(coord);
    // render form and store mapEvnet
    formView.render(mapEvent);
  }
}

const app = new Controller();
app.init();
