import Workout from './workout.js';

export default class Cycling extends Workout {
  type = 'cycling';
  constructor({ coords, route, distance, duration, elevationGain }) {
    super({ coords, route, distance, duration });
    this.elevationGain = elevationGain; // in steps/min
    this.calcPace();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60); // in km/h
    return this.speed;
  }
}
