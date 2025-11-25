// to handler serarch result
import View from "./View.js";

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    // set default error Message
    _errorMessage = 'No Recipe found for you query! Please try again';
    // set default success message
    _message = '';

    _generalMarkup(){
        console.log(this._data);
        return this._data.map(this._generalMarkupPreview).join('');
    }

    _generalMarkupPreview(result){
        return `
            <li class="preview">
                <a class="preview__link" href="#${result.id}">
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

export default new ResultView();