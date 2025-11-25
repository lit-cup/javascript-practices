class SearchView{
    #parentEl = document.querySelector('.search');

    getQuery(){
        // return input query from user, than clear input field
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    #clearInput(){
        // clean input field
        this.#parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(controlSearchResults){
        // handle the submit event of serach, than call controlSearchResults()
        this.#parentEl.addEventListener('submit', function(e){
            e.preventDefault();
            controlSearchResults();
        })
    }
};

export default new SearchView();