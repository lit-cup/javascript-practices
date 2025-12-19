class formView {
  _form = document.querySelector('.form');
  _inputType = document.querySelector('.form__input--type');
  _inputDuration = document.querySelector('.form__input--duration');
  _inputDistance = document.querySelector('.form__input--distance');
  _inputCadence = document.querySelector('.form__input--cadence');
  _inputElevation = document.querySelector('.form__input--elevation');
  _errorMessage = document.querySelector('.error-message');
  _sidebar = document.querySelector('.sidebar');
  _logo = document.querySelector('.logo');
  #mapEvent;
  addHandlerMapSubmit(handleMapSubmit) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleMapSubmit();
    });
  }
  addHandlerIconClick() {
    this._logo.addEventListener('click', () => {
      this._toggleSidebar();
    });
  }
  addHandlerInputTypeChange() {
    this._inputType.addEventListener('change', () => {
      this._clearInput();
      this._toggleElevationField();
    });
  }
  getInput() {
    // Get input data from the form
    const { lat, lng } = this.#mapEvent.latlng;

    return {
      type: this._inputType.value,
      distance: +this._inputDistance.value,
      duration: +this._inputDuration.value,
      cadence:
        this._inputType.value === 'running'
          ? +this._inputCadence.value
          : 'noneTypeExist',
      elevationGain:
        this._inputType.value === 'cycling'
          ? +this._inputElevation.value
          : 'noneTypeExist',
      coords: [lat, lng],
    };
  }
  _clearInput() {
    this._inputDistance.value = '';
    this._inputDuration.value = '';
    this._inputCadence.value = '';
    this._inputElevation.value = '';
  }
  _toggleElevationField() {
    this._inputCadence
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
    this._inputElevation
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
  }
  _toggleSidebar() {
    this._sidebar.classList.toggle('minisize');
  }
  _openSidebar() {
    this._sidebar.classList.remove('minisize');
    this._clearInput();
  }
  _closeSidebar() {
    this._sidebar.classList.add('minisize');
    this._clearInput();
  }
  _setMapEvent(mapEvent) {
    this.#mapEvent = mapEvent;
  }
  render() {
    this._form.classList.remove('hidden');
    this._inputDistance.focus();
  }
  closeForm() {
    this._form.classList.add('hidden');
  }
  _renderError(message) {
    if (!this._errorMessage.classList.contains('hidden')) return;
    this._errorMessage.textContent = message;
    this._errorMessage.classList.remove('hidden');
    setTimeout(() => {
      this._errorMessage.classList.add('hidden');
    }, 3000);
  }
}

export default new formView();
