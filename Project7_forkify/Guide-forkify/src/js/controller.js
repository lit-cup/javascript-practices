import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";

// import icons from '../img/icons.svg'; // parcel 1
// import icons from 'url:../img/icons.svg'; // parcel 2
// console.log(icons); // path of icons.svg
// console.log('loaded controller.js');

// polyfilling for old browser vite no needy, vite use ES modules, when bundling rollup it will choice add polyfill for needy
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////



// get one single recipe
const controlRecipe = async function() {
  try {
    // console.log('controlRecipe fired');
    // get hash id then we could fetch by id, MVC: not it is application itself
    const id = window.location.hash.slice(1);
    // console.log(id);
    // if id not exist or null return
    if(!id) return;

    // 1) loading recipe MVC: v
    //// Spinner
    recipeView.renderSpinner();

    //// model of load recipe, await to make sure model is working
    await model.loadRecipe(id);

    // 2) Render recipte
    recipeView.render(model.state.recipe);

  } catch (error) {
    // redner error from view part
    recipeView.renderError();
  } 
};

// controlSearch event
// view(Handler) -> control(fuction call) -> view(getQuery) -> model(load、render)
const controlSearchResults = async function(){
  try {
    // 1) Get serarch query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
}

// use foreach to let difference event could call in one event listener
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// depends on ssub-pub pattern move this to view part, recipeVew.js
// Array.from(['hashchange', 'load']).forEach(element => {
//   // listener for hashchange, load event when recipe click, page load 
//   window.addEventListener(element, controlRecipe);
// });

// create addHandlerRender to handle eventlistener to more close to MVC Architecture view part using sub-pub pattern
// keep controller do controll part mission not dom view part
const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}

init();