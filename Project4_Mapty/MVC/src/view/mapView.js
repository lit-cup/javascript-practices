import { MAP_VIEW_LEVEL } from './config.js';
class mapView {
  #handlerMapClick;
  #map;
  renderMap(coords) {
    // set mapEvent
    this.#map = L.map('map').setView(coords, MAP_VIEW_LEVEL);
    // apply view
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // map click listener
    this.#map.on('click', this.#handlerMapClick.bind(this));
  }
  setView(coords) {
    if (!this.#map);
    this.#map.setView(coords, MAP_VIEW_LEVEL, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
  setMapClickHandler(handler) {
    this.#handlerMapClick = handler;
  }
  renderMarker(workout) {
    L.marker(workout.coords)
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
      .openPopup();
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
