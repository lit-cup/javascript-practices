import { MAP_VIEW_LEVEL } from './config.js';

class mapView {
  #handlerMapClick;
  #mapEvent;
  #coords;
  renderMap(coords) {
    this.#mapEvent = L.map('map').setView(coords, MAP_VIEW_LEVEL);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#mapEvent);

    this.#mapEvent.addEventListener('click', this.#handlerMapClick);
  }
  setMapClickHandler(handler) {
    this.#handlerMapClick = handler;
  }
  setCoords(coords) {
    this.#coords = coords;
  }
  getCoords() {
    return this.#coords;
  }
  //   _showRouteAndPan(mapE) {
  //     this.#mapEvent = mapE;
  //     // Listen for first click
  //     this.#marker1 = L.marker(mapE.latlng)
  //       .addTo(this.#map)
  //       .bindPopup('Start')
  //       .openPopup();
  //     this.#markers.push(this.#marker1); // Track in #markers
  //     // Listen for second click
  //     this.#map.once('click', e => {
  //       this.#marker2 = L.marker(e.latlng)
  //         .addTo(this.#map)
  //         .bindPopup('End')
  //         .openPopup();
  //       this.#markers.push(this.#marker2); // Track in #markers
  //       this._setRouteAndPan(); // Draw route after second click
  //     });
  //   }
}

export default new mapView();
