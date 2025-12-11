import View from './View.js';
import icons from '../../img/icons.svg?url';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPageButtonClick(controlPagination) {
    this._parentElement.addEventListener('click', function (e) {
      // use closest to find the button we click and listening
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      // get goto page from data-goto attribute
      const goToPage = +btn.dataset.goto;

      // call controlPagination function from controller.js, then use goToPage to render the right page we clikced
      controlPagination(goToPage);
    });
  }

  // use search data from model,use data-goto attribute to get which page to go
  _generalMarkup() {
    const curPage = this._data.page;
    // calculate total number of pages
    // returns the smallest integer greater than or equal to a given number.
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // All page's situions for button
    // Page1, and there are other pages
    if (curPage === 1 && numPage > 1) {
      this._parentElement.style.justifyContent = 'end';
      // return next button for render, for page 1
      return ` 
            <div class="label--inline pagination__label--currPage">${curPage}</div>
            <button data-goto='${
              curPage + 1
            }' class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
    }

    // last page
    if (curPage === numPage && numPage > 1) {
      this._parentElement.style.justifyContent = 'start';
      // return pre button for render, for last page
      return `
            <button data-goto='${
              curPage - 1
            }' class="btn--inline pagination__btn--prev">
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
             </svg>
             <span>Page ${curPage - 1}</span>
            </button>
            <div class="label--inline pagination__label--currPage">${curPage}</div>
            `;
    }

    // other page
    if (curPage < numPage) {
      // return prev/next button for render, for other page
      return `
            <button data-goto='${
              curPage - 1
            }' class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            <div class="label--inline pagination__label--currPage">${curPage}</div>
            <button data-goto='${
              curPage + 1
            }' class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
    }

    // Page1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
