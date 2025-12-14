import { MAP_VIEW_LEVEL } from './config.js';
class mapView {
  #handlerMapClick;
  #map;
  _isDebug = false; // hanlde Debug;
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
  renderMarker(coords, workout = null) {
    // start maker popup, end maker not popup
    const marker = L.marker(coords).addTo(this.#map);
    // when no workout return mark not include popup
    if (!workout) return marker;
    marker
      .bindPopup(
        L.popup({
          maxWidth: 200,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}
          ${
            this._isDebug
              ? `X:${coords[0].toFixed(3)}, Y:${coords[1].toFixed(3)}`
              : ''
          }`
      )
      .openPopup();
    return marker;
  }
  renderRoute({ startMark, endMark }) {
    L.Routing.control({
      waypoints: [L.latLng(startMark), L.latLng(endMark)],
      lineOptions: { styles: [{ color: 'red', weight: 4 }] },
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      createMarker: () => {},
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
          .setLatLng(endMark)
          //.setContent(`Route ${index + 1}: ${routeDistanceKm} km`)
          .setContent(`Route: ${routeDistanceKm} km`)
          .openOn(this.#map);
      })
      .addTo(this.#map);
  }
}

export default new mapView();
