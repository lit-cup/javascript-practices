import { MAP_VIEW_LEVEL } from './config.js';
class mapView {
  #handlerMapClick;
  #map;
  #tempMaker = [];
  #routing = null;
  #routeControl;
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
  setRouteView({ startMark, endMark }) {
    if (!this.#map);
    const bounds = L.latLngBounds([startMark, endMark]);
    this.#map.fitBounds(bounds, {
      padding: [100, 100],
      maxZoom: 15,
    });
  }
  setMapClickHandler(handler) {
    this.#handlerMapClick = handler;
  }
  setStartMarkerContent(startMark, workout) {
    // start maker popup, end maker not popup
    const marker = L.marker(startMark)
      .addTo(this.#map)
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
  renderMarker(coords) {
    // start maker popup, end maker not popup
    const marker = L.marker(coords).addTo(this.#map);
    return marker;
  }
  // clearRouting() {
  //   console.log('clean route');
  //   this.#map.removeControl(this.#routeControl);
  //   this.#routeControl = null;
  // }
  renderRoute({ startMark, endMark }) {
    this.#routeControl = L.Routing.control({
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
    return this.#routeControl;
  }
  clearMapArtifacts() {
    this.#tempMaker.forEach(m => this.#map.removeLayer(m));
    this.#tempMaker.length = 0;
    if (this.#routing) {
      this.#map.removeControl(this.#routing);
      this.#routing = null;
    }
    this.#map.closePopup();
  }
  clearPreviewTempMarkers() {
    this.clearMapArtifacts();
  }
  addTempMarker(marker) {
    this.#tempMaker.push(marker);
  }
  getTempMaker() {
    return this.#tempMaker;
  }

  setTempRouting(route) {
    this.#routing = route;
  }
  getTempRouting() {
    return this.#routing;
  }
}

export default new mapView();
