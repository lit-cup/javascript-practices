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
  // only update changed part not re-render all for recipe ingredients update: DOM select
  update(data){
    this._data = data;
    const newMarkup = this._generalMarkup();
    // transfrom string to real DOM object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // transfrom DOM object to array for easy loop
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));  

    // compare newElements and curElements two array node by node
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // change text if node、text different for only update ingredients text content
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
        curEl.textContent = newEl.textContent;
        // console.log(newEl.firstChild.nodeValue.trim());
      }

      // change attribute if node different for servings update to new data attribute 
      if(!newEl.isEqualNode(curEl)){
        Array.from(newEl.attributes).forEach(attr => {
          // replace attribute in current element which we expect to set when update
          curEl.setAttribute(attr.name, attr.value);
        })
      }
    });
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
