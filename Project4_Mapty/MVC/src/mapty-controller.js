import * as model from './mapty-model.js';
import mapView from './view/mapView.js';
import formView from './view/formView.js';
import workoutView from './view/workoutView.js';
import Running from './model/running.js';
import Cycling from './model/cycling.js';

class Controller {
  init() {
    this._getPosition();
    // map click event: deferred binding
    mapView.setMapClickHandler(this._handleMapClick.bind(this));
    // form input type change event
    formView.addHandlerInputTypeChange();
    // map sumbit evnet
    formView.addHandlerMapSubmit(this._handleMapSubmit.bind(this));
    // map workout item click
    workoutView.addHandlerWorkoutClick(this._handleWorkoutClick.bind(this));

    console.log('NEW SCHEMA VERSION');
    localStorage.clear();

    localStorage.setItem('schemaVersion', '2');
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
    // render default map by coord
    mapView.renderMap(coords);
  }
  _handleMapSubmit() {
    try {
      // get form input
      const input = formView.getInput();
      // get start end mark latlng
      const { startMark, endMark } = model.state.tempRoute;
      if (!startMark || !endMark) return;
      // check input finite
      this._isInputFinite(input);
      const newWorkout = this._formatTypeWorkout(input);
      console.log(newWorkout);
      // TODO: view-> model to model->view
      // render workout
      workoutView.render(newWorkout);
      // render start mark
      mapView.renderMarker(startMark, newWorkout);
      // render end mark
      mapView.renderMarker(endMark);
      // render route
      mapView.renderRoute(startMark, endMark);
      // store workout in model
      model.addWorkout(newWorkout);
      // store in localStorage
      localStorage.setItem('workouts', JSON.stringify(model.state.workouts));
      // resetRoute
      model.resetRoute();
      // close sidebar
      formView._closeSidebar();
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
    console.log(model.state.tempRoute);
    // if workout is running, create running object
    if (input.type === 'running') {
      return new Running({
        coords: input.coords,
        route: structuredClone(model.state.tempRoute),
        distance: input.distance,
        duration: input.duration,
        cadence: input.cadence,
      });
    }
    if (input.type === 'cycling') {
      return new Cycling({
        coords: input.coords,
        route: structuredClone(model.state.tempRoute),
        distance: input.distance,
        duration: input.duration,
        cadence: input.cadence,
      });
    }
  }
  _handleWorkoutClick(workoutEl) {
    // find workout data match click one
    const currWorkout = model.state.workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    if (!currWorkout) return;
    // set workout view
    mapView.setView(currWorkout.coords);
  }
  _handleMapClick(mapEvent) {
    console.log(mapEvent);
    const { lat, lng } = mapEvent.latlng;
    // preview  mark by click location
    if (!model.state.tempRoute.startMark || !model.state.tempRoute.endMark)
      mapView.renderMarker([lat, lng]);
    // store mapEvnet
    formView._setMapEvent(mapEvent);

    // TODO: check why model.state.route store workout id
    // mark&route: store two point latlng
    model.setRoutePoint([lat, lng]);
    // mapView.previewRoutePoint(model.state.route);
    // render form
    formView.render();
    // open sideBar
    formView._openSidebar();
  }
}

const app = new Controller();
app.init();
