class workoutView {
  _workoutContainer = document.querySelector('.work');
  clear() {
    this._workoutContainer.innerHTML = '';
  }
  render(workout) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}"> 
          <div class='workout__head'>
            <h2 class="workout__title">${workout.description}</h2>
            <div class="tool-btn tool-delete">
              <input class="edit edit__delete" data-id="${
                workout.id
              }" type="image" src="../img/delete.png" alt="delete" width="30" height="30">
              <span class="desc desc__delete">Delete</span>
            </div> 
          </div>
          <div class="workout__body">
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
        `;
    if (workout.type === 'running') {
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
            </div>
          </div>
          </li> `;
    }

    if (workout.type === 'cycling') {
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⛰</span>
              <span class="workout__value">${workout.elevationGain}</span>
              <span class="workout__unit">m</span>
            </div>
          </div>         
          </li>`;
    }
    this._workoutContainer.insertAdjacentHTML('afterbegin', html);
  }
}

export default new workoutView();
