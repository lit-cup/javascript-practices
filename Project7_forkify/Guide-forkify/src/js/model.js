// import { result } from "lodash-es";
import { API_URL, RES_PER_PAGE } from "./config";
import { getJson } from "./view/helpers";
// import recipeView from "./view/recipeView";

// state: store all data we need
export const state = {
    // store recipe data
    recipe: {},
    // store search data
    search: {
        // query for future if we need to analyze what query search most
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

// this model not will return anything keep it private
export const loadRecipe = async function(id){
    try{
        const data = await getJson(`${API_URL}/${id}`);

        // const res = await fetch(`${API_URL}/${id}`); 
        // const data = await res.json();
        // console.log(data);
        // // make better error message
        // if(!res.ok) throw new Error(`${data.message} (${res.status})`);

        // set recipe object with porpoty we want
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }
        // check if current recipe is bookmarked from bookmark array we stored after click bookmark button
        if(state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else
            state.recipe.bookmarked = false;

        console.log(state.recipe);
    }catch(error){
        // temp error handling
        console.log(`${error}!!!!!!!!!!`);

        // to make error come from view part
        throw error;
    }
};

// implementing the search functionality
export const loadSearchResults = async function ( query ){
    try {
        state.search.query = query;
        // serarch when API call
        const data = await getJson(`${API_URL}?search=${query}`);
        console.log(data);

        // to reciving recipes from data create obj, store in the state
        state.search.results = data.data.recipes.map(recipe => { 
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            };
        });
  
        // init state.search.page to page 1 when everytime new search query
        state.search.page = 1;

        // console.log(state.search.results);
    } catch (error) {
        // temp error handling
        console.log(`${error}!!!!!!!!!!`);
        // to make error come from view part
        throw error;
    }
};

export const getSearchResultPage = function(page = state.search.page){
    // store value to make we control page easier, default is page 1
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage; // 0
    const end = page * state.search.resultsPerPage; // 9
    
    return state.search.results.slice(start, end);   // 1 page per 10 results
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        // newQt = oldQt * newServing / oldServing // 2 * 8 / 4 = 4
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings; 
    });
    // update new Serving
    state.recipe.servings = newServings;
}

export const addBookMark = function(recipe){
    // add bookmark
    state.bookmarks.push(recipe);

    // Marck current recipe as bookmark
    // UI: this._data.bookmarked ? '-fill': '';
    if(recipe.id === state.recipe.id)
        state.recipe.bookmarked = true;
}

export const deleteBookMark = function(id){
    // remove bookmark in state.bookmarks array
    const index = state.bookmarks.findIndex(recipe => recipe.id === id);
    state.bookmarks.splice(index, 1);

    // Marck current recipe as NOT bookmark
    // UI: this._data.bookmarked ? '-fill': '';
    if(id === state.recipe.id)
        state.recipe.bookmarked = false;
}