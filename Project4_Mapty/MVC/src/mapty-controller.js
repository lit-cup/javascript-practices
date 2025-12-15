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
    // sidebar button click hander
    formView.addHandlerIconClick();
    // map sumbit evnet
    formView.addHandlerMapSubmit(this._handleMapSubmit.bind(this));
    // map workout item click
    workoutView.addHandlerWorkoutClick(this._handleWorkoutClick.bind(this));

    // console.log('NEW SCHEMA VERSION');
    // // localStorage.clear();

    // localStorage.setItem('schemaVersion', '2');
  }
  _loadWorkout() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!Array.isArray(data)) {
      model.state.workouts = [];
      return;
    }
    model.state.workouts = data;
    this._workoutsRenderHelper(model.state.workouts);
  }
  _workoutsRenderHelper(workouts) {
    workoutView.clear();
    workouts.forEach(workout => {
      // close hasMark
      workout.hasMark = false;
      // render list workout
      workoutView.render(workout);
    });
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
    // reload workout data
    this._loadWorkout();
  }
  _handleMapSubmit() {
    try {
      // get current form input
      const input = formView.getInput();
      // check current input finite
      this._isInputFinite(input);
      // Buidl than store current workout in model
      const currWorkout = model.addWorkout(this._formatTypeWorkout(input));
      // remove repeat mark
      model.state.preView.startMark.remove();
      // render current start/end mark
      mapView.setStartMarkerContent(currWorkout.routes.startMark, currWorkout);
      // render workouts list
      mapView.clearRouting();
      // render routes
      mapView.renderRoute(currWorkout.routes);
      // render workout;
      workoutView.render(currWorkout);
      // resetRouteMark
      model.resetRouteMark();
      // close sidebar
      formView._closeSidebar();
      // store in localStorage
      localStorage.setItem('workouts', JSON.stringify(model.state.workouts));
    } catch (error) {
      console.log(error);
      formView._renderError(error.message);
    }
  }
  _isInputFinite({ type, distance, duration, cadence, elevationGain }) {
    const valueToCheck = type === 'running' ? cadence : elevationGain;
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
    // if workout is running, create running object
    if (input.type === 'running') {
      return new Running({
        coords: input.coords,
        routes: structuredClone(model.state.tempRoute),
        distance: input.distance,
        duration: input.duration,
        cadence: input.cadence,
      });
    }
    if (input.type === 'cycling') {
      return new Cycling({
        coords: input.coords,
        routes: structuredClone(model.state.tempRoute),
        distance: input.distance,
        duration: input.duration,
        elevationGain: input.elevationGain,
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
    mapView.setRouteView(currWorkout.routes);
    console.log(currWorkout);
    // re-render Marker
    if (currWorkout.hasMark === false) {
      mapView.setStartMarkerContent(currWorkout.routes.startMark, currWorkout);
      mapView.renderMarker(currWorkout.routes.endMark);
    }
    // render workouts list
    mapView.clearRouting();
    // render routes
    mapView.renderRoute(currWorkout.routes);
    formView._closeSidebar();
  }
  _handleMapClick(mapEvent) {
    const { lat, lng } = mapEvent.latlng;
    // preview  endmark by click location
    if (!model.state.tempRoute.startMark && !model.state.tempRoute.endMark)
      model.addStartPreViewMarker(mapView.renderMarker([lat, lng]));
    else if (model.state.tempRoute.startMark && !model.state.tempRoute.endMark)
      model.addEndPreViewMarker(mapView.renderMarker([lat, lng]));
    // store mapEvnet for getInput()
    formView._setMapEvent(mapEvent);
    // mark&route: store two point latlng
    model.setRouteMarkPoint([lat, lng]);
    // mapView.previewRoutePoint(model.state.route);
    // render form
    formView.render();
    // open sideBar
    formView._openSidebar();
  }
}

const app = new Controller();
app.init();
