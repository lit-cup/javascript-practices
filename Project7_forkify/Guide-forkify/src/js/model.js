// import { result } from "lodash-es";
import { API_URL } from "./config";
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
    },
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

        // console.log(state.search.results);
    } catch (error) {
        // temp error handling
        console.log(`${error}!!!!!!!!!!`);
        // to make error come from view part
        throw error;
    }
};