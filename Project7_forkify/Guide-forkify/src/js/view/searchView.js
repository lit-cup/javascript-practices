class SearchView{
    _parentEl = document.querySelector('.search');

    getQuery(){
        // return input query from user, than clear input field
        const query = this._parentEl.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput(){
        // clean input field
        this._parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(controlSearchResults){
        // handle the submit event of serach, than call controlSearchResults()
        this._parentEl.addEventListener('submit', function(e){
            e.preventDefault();
            controlSearchResults();
        })
    }
};

export default new SearchView();