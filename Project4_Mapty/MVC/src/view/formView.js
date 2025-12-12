class formView {
  _form = document.querySelector('.form');
  _inputType = document.querySelector('.form__input--type');
  _inputDuration = document.querySelector('.form__input--duration');
  _inputDistance = document.querySelector('.form__input--distance');
  _inputCadence = document.querySelector('.form__input--cadence');
  _inputElevation = document.querySelector('.form__input--elevation');
  _errorMessage = document.querySelector('.error-message');
  addHandlerMapSubmit(handleMapSubmit) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleMapSubmit();
    });
  }
  getInput(coords) {
    // Get input data from the form
    return {
      type: this._inputType.value,
      distance: +this._inputDistance.value,
      duration: +this._inputDuration.value,
      cadence:
        this._inputType.value === 'running'
          ? +this._inputCadence.value
          : 'noneTypeExist',
      elevation:
        this._inputElevation.value === 'Cycling'
          ? +this._inputElevation.value
          : 'noneTypeExist',
      coords: coords,
    };
  }
  _toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('minisize');
  }
  renderForm() {
    this._form.classList.remove('hidden');
    this._inputDistance.focus();
    this._toggleSidebar();
  }
  _renderError(message) {
    if (!this._errorMessage.classList.contains('hidden')) return;
    // console.log(message);
    this._errorMessage.textContent = message;
    this._errorMessage.classList.remove('hidden');
    setTimeout(() => {
      this._errorMessage.classList.add('hidden');
    }, 3000);
  }
}

export default new formView();
