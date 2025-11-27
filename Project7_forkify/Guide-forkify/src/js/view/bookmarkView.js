// to handler serarch result
import View from "./View.js";

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    // set default error Message
    _errorMessage = 'No boolmark exist, found a nice recipe and bookmark it :)';
    // set default success message
    _message = '';

    _generalMarkup(){
        // console.log(this._data);
        return this._data.map(this._generalMarkupPreview).join('');
    }

    _generalMarkupPreview(result){
        // mark for one select result item by compare result id and current id in url
        const id = window.location.hash.slice(1);
        return `
            <li class="preview">
                <a class="preview__link ${result.id === id ? 'preview__link--active' : '' }" href="#${result.id}">
                    <figure class="preview__fig">
                        <img src="${result.image}" alt="${result.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${result.title}</h4>
                        <p class="preview__publisher">${result.publisher}</p>
                    </div>
                </a>
            </li>
        `
    }
}

export default new BookmarksView();