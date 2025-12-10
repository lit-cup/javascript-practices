import { MAP_VIEW_LEVEL } from './config.js';

class mapView {
  #map;
  renderMap(coords) {
    this.#map = L.map('map').setView(coords, MAP_VIEW_LEVEL);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
  }
}

export default new mapView();
