import * as model from './mapty-model.js';
import mapView from './view/mapView.js';
import formView from './view/formView.js';
import workoutView from './view/workoutView.js';
import Running from './model/running.js';
import Cycling from './model/cycling.js';
import toolView from './view/toolView.js';

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
    toolView.addHandlerEditClick(this._handleEditClick.bind(this));

    toolView.addHandlerSortClick(this._handleSortClick.bind(this));

    toolView.addHandlerShowAllWorkout(this._handleShowAllWorkout.bind(this));

    toolView.addHandlerDeleteAll(this._handleDeleteAll.bind(this));

    toolView.addHandlerContainerClick(
      this._handleDeleteWorkout.bind(this),
      this._handleWorkoutClick.bind(this)
    );
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
    if (workouts)
      workouts.forEach(workout => {
        // render list workout
        workoutView.render(workout);
      });
  }
  _getPosition() {
    if (navigator.geolocation) {
      // showError use arrow function because getCurrentPosition callback just listening error evnt once time
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        formView._renderError(
          'Could not get your location. Please Check location access.'
        );
      });
    } else {
      formView._renderError('Geolocation is not supported by your browser.');
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
      //guard: return when mark not right, and reset tempRoute;
      if (!model.state.tempRoute.startMark || !model.state.tempRoute.endMark)
        return;
      // get current form input
      const input = formView.getInput();
      // clear up mark/ route temp and close sidebar form
      this._resetTempWorkoutUI();
      // check current input finite
      this._isInputFinite(input);
      // Buidl than store current workout in model
      const currWorkout = model.addWorkout(this._formatTypeWorkout(input));

      this._addTempWorkoutUI(currWorkout);
      // reset model state tempRoute Marker
      model.resetTempRouting();
      // render workout;
      workoutView.render(currWorkout);
      // store in localStorage
      localStorage.setItem('workouts', JSON.stringify(model.state.workouts));
    } catch (error) {
      formView._renderError(error.message);
    }
  }
  _isInputFinite({ type, distance, duration, cadence, elevationGain }) {
    const valueToCheck = type === 'running' ? cadence : elevationGain;
    const value = [distance, duration, valueToCheck];
    const allFinite = value.every(val => Number.isFinite(val));
    const allPositive = value.every(val => val > 0);
    // finite error message
    if (!allFinite) {
      throw new Error('Inputs must be numbers.');
    }
    // positive error message
    if (!allPositive) {
      throw new Error(
        type === 'running'
          ? 'Distance, duration and cadence must be positive numbers. Please Try Again'
          : 'Distance, duration and elevation must be positive numbers. Please Try Again'
      );
    }
  }
  _addTempWorkoutUI(currWorkout) {
    // render current startmark/endMark with popup content & store in mapView tempMarker
    mapView.addTempMarker(
      mapView.setStartMarkerContent(currWorkout.routes.startMark, currWorkout)
    );
    mapView.addTempMarker(mapView.renderMarker(currWorkout.routes.endMark));
    // render routes
    mapView.setTempRouting(mapView.renderRoute(currWorkout.routes));
  }
  _resetTempWorkoutUI() {
    // clear map before re-render mark routing
    mapView.clearMapArtifacts();
    // close sidebar
    formView._closeSidebar();
    // close form()
    formView.closeForm();
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
  _handleWorkoutClick(workoutID) {
    // guard
    if (toolView.getIsEdited() && model.state.currWorkoutId != null) return;
    // clear up mark/ route temp and close sidebar form
    this._resetTempWorkoutUI();
    // find workout data match click one
    const currWorkout = model.state.workouts.find(
      work => work.id === workoutID
    );
    if (!currWorkout) return;
    // set current workout by id
    model.setCurrWorkout(currWorkout.id);
    // set workout view
    mapView.setRouteView(Object.values(currWorkout.routes));
    // re-render start/end Marker and store tempMark
    mapView.addTempMarker(
      mapView.setStartMarkerContent(currWorkout.routes.startMark, currWorkout)
    );
    mapView.addTempMarker(mapView.renderMarker(currWorkout.routes.endMark));
    // render routes
    mapView.setTempRouting(mapView.renderRoute(currWorkout.routes));
  }
  _handleMapClick(mapEvent) {
    const { lat, lng } = mapEvent.latlng;
    // guard: avoid three mark conditional
    if (model.state.tempRoute.startMark && model.state.tempRoute.endMark)
      return;
    // clear preview mark/route when two tempMark exist after submit
    if (mapView.getTempMaker().length === 2) mapView.clearPreviewTempMarkers();
    // store mapEvnet for getInput()
    formView._setMapEvent(mapEvent);
    // preview mark add and store in mapView tempMark of UI instance state
    if (!model.state.tempRoute.startMark)
      mapView.addTempMarker(mapView.renderMarker([lat, lng]));
    else if (!model.state.tempRoute.endMark)
      mapView.addTempMarker(mapView.renderMarker([lat, lng]));
    // mark&route: store two point latlng
    model.setTempRoutingMarker([lat, lng]);
    // render form
    formView.render();
    // open sideBar
    formView._openSidebar();
  }
  _handleEditClick() {
    if (
      !toolView.getIsEdited() &&
      model.state.currWorkoutId !== null &&
      model.state.workouts.length > 0
    ) {
      toolView.setEditOpen();
    } else if (toolView.getIsEdited() && model.state.currWorkoutId !== null) {
      model.resetCurrWorkout();
      toolView.setEditClose();
    }
  }
  _handleShowAllWorkout() {
    if (model.state.workouts.length === 0) return;
    // clear up mark/ route temp and close sidebar form
    this._resetTempWorkoutUI();

    // set workout view
    mapView.setRouteView(
      model.state.workouts.map(w => Object.values(w.routes)),
      true
    );
    model.state.workouts.forEach(workout => {
      this._addTempWorkoutUI(workout);
    });
  }
  _handleDeleteAll() {
    toolView.setEditClose();
    formView.closeForm();
    mapView.clearMapArtifacts();
    localStorage.removeItem('workouts');
    model.resetTempRouting();
    model.state.workouts = [];
    mapView.reloadMap();
    this._workoutsRenderHelper(model.state.workouts);
  }
  _handleDeleteWorkout(workoutId, e) {
    e.stopPropagation();
    if (!toolView.getIsEdited() || workoutId != model.state.currWorkoutId)
      return;
    const selectedWorkoutIndex = model.state.workouts.findIndex(
      workout => workout.id === workoutId
    );
    if (selectedWorkoutIndex < 0) return;
    // delete workout in the model state by currect workou index
    model.deleteWrokout(selectedWorkoutIndex);
    toolView.setEditClose();
    this._afterDeleteCleanUp();
    localStorage.setItem('workouts', JSON.stringify(model.state.workouts));
  }
  _afterDeleteCleanUp() {
    this._workoutsRenderHelper(model.state.workouts);
    this._resetTempWorkoutUI();
    model.resetCurrWorkout();
  }
  _handleSortClick() {
    if (model.state.workouts.length > 0) {
      workoutView.clear();
      model.state.workouts
        .sort((a, b) => a.distance - b.distance)
        .forEach(work => workoutView.render(work));
      // store in localStorage
      localStorage.setItem('workouts', JSON.stringify(model.state.workouts));
    }
  }
}

const app = new Controller();
1;
app.init();
