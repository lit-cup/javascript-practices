import Workout from './workout.js';

export default class Cycling extends Workout {
  type = 'cycling';
  constructor({ coords, routes, distance, duration, elevationGain }) {
    super({ coords, routes, distance, duration });
    this.elevationGain = elevationGain; // in steps/min
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60); // in km/h
    return this.speed;
  }
}
