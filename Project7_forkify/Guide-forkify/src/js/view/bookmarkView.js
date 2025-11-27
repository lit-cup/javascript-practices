// to group bookmark result string
import View from "./View.js";
import previewView from "./previewView.js";

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    // set default error Message
    _errorMessage = 'No boolmark exist, found a nice recipe and bookmark it :)';
    // set default success message
    _message = '';

    _generalMarkup(){
        // console.log(this._data);
        // store all bookmark string from (previewView extends View) render method with render = false to return markup string
        // with preview UI for each bookmark item then return join() all string to one string, preparing for update/ render method
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }
}

export default new BookmarksView();