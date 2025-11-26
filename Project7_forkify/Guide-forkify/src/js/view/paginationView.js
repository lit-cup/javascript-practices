import View from "./View.js";
import icons from '/src/img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    // use search data from model
    _generalMarkup(){
        const curPage = this._data.page
        // returns the smallest integer greater than or equal to a given number.
        const numPage = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log('numPage', numPage);
        console.log('dataPage', this._data.page)

        // Page1, and there are other pages
        if(curPage === 1 && numPage > 1){
            // return next button for render, for page 1
            return `        
            <button class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
        }
        
        // last page
        if(curPage === numPage && numPage > 1){
            // return pre button for render, for last page
            return `
            <button class="btn--inline pagination__btn--prev">
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
             </svg>
             <span>Page ${curPage - 1}</span>
            </button>`;
        }
        
        // other page
        if(curPage < numPage){
            // return prev/next button for render, for other page
            return `
            <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next">
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