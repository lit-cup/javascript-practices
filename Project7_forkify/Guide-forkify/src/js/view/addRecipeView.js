import View from "./View.js";

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded :)';   
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow(){
        // use toggleWindwo.bind() to fix this keyword point to button not upload form
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
        
    }
    
    _addHandlerHideWindow(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }

    addHandlerUploadRecipe(controlAddRecipe){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            // html to js Array using FormData API
            const dataArr = [...new FormData(this)];
            // convert Array to object using Object.fromEntries()
            const data = Object.fromEntries(dataArr);
            controlAddRecipe(data);
        });
    }

    _generalMarkup(){
    
    }

}

export default new AddRecipeView();