import Workout from './workout.js';
export default class Running extends Workout {
  type = 'running';
  constructor({ coords, routes, distance, duration, cadence }) {
    super({ coords, routes, distance, duration });
    this.cadence = cadence; // in steps/min
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    this.pace = this.duration / this.distance; // in min/km
    return this.pace;
  }
}
