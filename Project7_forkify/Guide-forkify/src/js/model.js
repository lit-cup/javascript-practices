import { API_URL } from "./config";
import { getJson } from "./view/helpers";

export const state = {
    recipe: {},
}

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
    }
}