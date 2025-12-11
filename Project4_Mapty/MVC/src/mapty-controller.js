import mapView from './view/mapView.js';
import formView from './view/formView.js';
import * as model from './mapty-model.js';
class Controller {
  init() {
    this._getPosition();
    // map click event: deferred binding
    mapView.setMapClickHandler(this._handleMapClick.bind(this));
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
    // store coords data to model
    model.state.coords = coords;
    // render default map by coord
    mapView.renderMap(coords);
  }
  _showError(message) {
    // console.log(message);
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
      errorMessage.classList.add('hidden');
    }, 3000);
  }
  _handleMapSubmit() {
    // get from input
    const input = formView.getInput(model.state.coords);
    console.log(input);
    // store in model
    model.addWorkout(input);
    // workout type chcek rebuild obj

    // render workout
    model.state.workouts.forEach(workout => {
      formView.renderWorkOut(workout);
    });
    // render mark
  }
  _handleMapClick() {
    // store temp mapEvnet
    console.log(model.state.coords);
    // preview  mark and route by click location
    // mapViewRenderPreviewSingle(coord);
    // render form
    formView.renderForm();
  }
}

const app = new Controller();
app.init();
