import icons from '/src/img/icons.svg';

export default class View {
  _data;

  render(data) {
    // check if data is null, undefine, not array, array length = 0, than render error
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generalMarkup();
    this._clear();
    this._insertMarkup(markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _insertMarkup(markup) {
    // console.log('insert', this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
    this._clear();
    this._insertMarkup(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
            <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
            </div>`;
    this._clear();
    this._insertMarkup(markup);
  }
  // for success message
  renderMessage(message = this._message) {
    const markup = `
            <div class="recipe">
            <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._insertMarkup(markup);
  }
}
