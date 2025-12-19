import { MAP_VIEW_LEVEL } from './config.js';
class mapView {
  #handlerMapClick;
  #map;
  #tempMaker = [];
  #routing = [];
  #pops = [];
  #routeControl;
  #coords;
  _isDebug = false; // hanlde Debug;
  renderMap(coords) {
    // set mapEvent
    this.#coords = coords;
    this.#map = L.map('map').setView(coords, MAP_VIEW_LEVEL);
    // apply view
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // map click listener
    this.#map.on('click', this.#handlerMapClick.bind(this));
  }
  reloadMap() {
    this.#map.setView(this.#coords, MAP_VIEW_LEVEL);
  }
  setRouteView(coords, showAll = false) {
    if (!this.#map);
    const bounds = L.latLngBounds(coords);
    this.#map.fitBounds(bounds, {
      padding: showAll ? [50, 50] : [150, 150],
      maxZoom: showAll ? MAP_VIEW_LEVEL : 20,
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
        const pop = L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
        })
          .setLatLng(endMark)
          //.setContent(`Route ${index + 1}: ${routeDistanceKm} km`)
          .setContent(`Route: ${routeDistanceKm} km`)
          .openOn(this.#map);
        this.#pops.push(pop);
      })
      .addTo(this.#map);
    return this.#routeControl;
  }
  clearMapArtifacts() {
    // clear markers
    this.#tempMaker.forEach(m => this.#map.removeLayer(m));
    this.#tempMaker.length = 0;
    if (this.#routing.length > 0) {
      // clear routings
      this.#routing.forEach(r => {
        this.#map.removeControl(r);
      });
      this.#routing.length = 0;
      // clear pops
      this.#pops.forEach(p => this.#map.closePopup(p));
      this.#pops.length = 0;
    }
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
    this.#routing.push(route);
  }
}

export default new mapView();
