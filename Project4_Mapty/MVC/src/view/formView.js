class formView {
  _form = document.querySelector('.form');
  _inputDistance = document.querySelector('.form__input--distance');
  #mapEvent;
  renderForm(mapE) {
    this.#mapEvent = mapE;
    this._form.classList.remove('hidden');
    this._inputDistance.focus();
    this._toggleSidebar();
  }

  _toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('minisize');
  }
}

export default new formView();
