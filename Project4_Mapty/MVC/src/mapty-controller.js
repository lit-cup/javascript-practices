import mapView from './view/mapView.js';
import formView from './view/formView.js';

class Controller {
  init() {
    this._getPosition();
  }
  _getPosition = function () {
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
  };
  _loadMap(position) {
    // get latitude, longitude
    const { latitude, longitude } = position.coords;
    // transform to coord arrays
    const coords = [latitude, longitude];

    // render default map by coord
    mapView.renderMap(coords);

    // map click event
    mapView.addHandlerMapClick(this._handleMapClick.bind(this));
  }
  _showError(message) {
    // console.log(message);
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
      errorMessage.classList.add('hidden');
    }, 3000);
  }
  _handleMapClick(mapE) {
    // save form
    // preview mark and route
    // render form
    formView.renderForm(mapE);
  }
}

const app = new Controller();
app.init();
