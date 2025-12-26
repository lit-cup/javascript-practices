import View from './View.js';
class sortView extends View {
  _parentElement = document.querySelector('.sort__select');
  _errorMessage = 'Could not get sort option. Please try again!';
  _message = '';
  addHandlerSort(controlSearchResultsSorted) {
    this._parentElement.addEventListener('change', function () {
      controlSearchResultsSorted();
    });
  }
  setDefultOption() {
    this._parentElement.value = 'default';
  }
  getSortOption() {
    try {
      const sortOption = this._parentElement.value;
      return sortOption;
    } catch (error) {
      this.renderError(this._errorMessage);
    }
  }
}

export default new sortView();
