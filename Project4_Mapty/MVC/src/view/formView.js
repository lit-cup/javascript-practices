class formView {
  _form = document.querySelector('.form');
  _inputType = document.querySelector('.form__input--type');
  _inputDuration = document.querySelector('.form__input--duration');
  _inputDistance = document.querySelector('.form__input--distance');
  _workform = document.querySelector('.work');
  renderForm() {
    this._form.classList.remove('hidden');
    this._inputDistance.focus();
    this._toggleSidebar();
  }
  addHandlerMapSubmit(handleMapSubmit) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleMapSubmit();
    });
  }
  getInput(coords) {
    // Get data from the form
    const type = this._inputType.value;
    const distance = +this._inputDistance.value;
    const duration = +this._inputDuration.value;
    return { type, distance, duration, coords };
  }
  _toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('minisize');
  }
  renderWorkOut(workout) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <input class="edit edit__delete" data-id="${
            workout.id
          }" style="opacity: 0;" type="image" src="../img/delete.png" alt="delete" width="30" height="30">
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
    // if (workout.type === 'running') {
    //   html += `
    //         <div class="workout__details">
    //           <span class="workout__icon">⚡️</span>
    //           <span class="workout__value">${workout.pace.toFixed(1)}</span>
    //           <span class="workout__unit">min/km</span>
    //         </div>
    //         <div class="workout__details">
    //           <span class="workout__icon">🦶🏼</span>
    //           <span class="workout__value">${workout.cadence}</span>
    //           <span class="workout__unit">spm</span>
    //         </div>
    //       </li>`;
    // }

    // if (workout.type === 'cycling') {
    //   html += `
    //         <div class="workout__details">
    //           <span class="workout__icon">⚡️</span>
    //           <span class="workout__value">${workout.speed.toFixed(1)}</span>
    //           <span class="workout__unit">km/h</span>
    //         </div>
    //         <div class="workout__details">
    //           <span class="workout__icon">⛰</span>
    //           <span class="workout__value">${workout.elevationGain}</span>
    //           <span class="workout__unit">m</span>
    //         </div>
    //       </li>`;
    // }
    this._workform.insertAdjacentHTML('afterbegin', html);
  }
}

export default new formView();
