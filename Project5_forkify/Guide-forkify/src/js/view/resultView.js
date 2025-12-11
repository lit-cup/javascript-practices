// to group serarch result string
import View from "./View.js";
import previewView from "./previewView.js";

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    // set default error Message
    _errorMessage = 'No Recipe found for you query! Please try again';
    // set default success message
    _message = '';

    _generalMarkup(){
        // console.log(this._data);
        // store all result string from (previewView extends View) render method with render = false to return markup string
        // with preview UI for each result item then return join() all string to one string, preparing for update/ render method
        return this._data.map(result => previewView.render(result, false)).join('');
    }
}

export default new ResultView();