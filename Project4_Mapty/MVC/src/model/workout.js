export default class Workout {
  date = new Date();
  constructor({ coords, routes, distance, duration }) {
    this.id = (Date.now() + '').slice(-10);
    this.coords = coords; // [lat, lng]
    this.routes = routes; // startMark, endMark
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}
