import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultView from "./view/resultView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarkView.js";

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

// hot reloading
// if(module.hot){
//   module.hot.accept
// }


// get one single recipe
const controlRecipe = async function() {
  try {
    // console.log('controlRecipe fired');
    // get hash id then we could fetch by id, MVC: not it is application itself
    const id = window.location.hash.slice(1);
    // console.log(id);
    // if id not exist or null return
    if(!id) return;

    // 0) upate result view to mark selected search result, not re-render all
    resultView.update(model.getSearchResultPage());
    // 0) update bookmark panel view when we render add or delete bookmark of recipe
    bookmarksView.update(model.state.bookmarks);

    // 1) loading recipe MVC: v
    //// Spinner
    recipeView.renderSpinner();

    //// model of load recipe, await to make sure model is working
    await model.loadRecipe(id);

    // 2) Render recipte
    recipeView.render(model.state.recipe);

  } catch (error) {
    // redner error from view part
    recipeView.renderError(error);
  } 
};

// controlSearch event
// view(Handler) -> control(fuction call) -> view(getQuery) -> model(load、render)
const controlSearchResults = async function(){
  try {
    resultView.renderSpinner();
    // console.log(resultView);

    // 1) Get search input query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) load search results from API call and store
    await model.loadSearchResults(query);

    // 3) Render results side bar, use getSearchResultPage() to control, and Pagination control
    // depends on how many recipes result show in one page
    // default page 1
    // console.log(model.state.search.results);
    resultView.render(model.getSearchResultPage());

    // 4) Render initial pagination button
    paginationView.render(model.state.search);

  } catch (error) {
    console.log(error);
  }
}

const controlPagination = function(gotoPage){
    // console.log('gotroPage', gotoPage);  
    // 3) Render new results side bar, by Pagination control
    resultView.render(model.getSearchResultPage(gotoPage));

    // 4) Render new initial pagination button
    paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  // Store update: update the recipe servings (in state)
  model.updateServings(newServings);
  
  // update all render the recipe view
  // recipeView.render(model.state.recipe)

  // UI update: only update the changed servings part attribute
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function(){

  // add/remove bookmark depends on bookmarked state
  if(!model.state.recipe.bookmarked){
    // 1) add bookmark
    model.addBookMark(model.state.recipe);
  }else{
    // 1) remove bookmark
    model.deleteBookMark(model.state.recipe.id);
  }
  console.log(model.state.recipe);
  // 2) update recipe view mark bookmark after change
  recipeView.update(model.state.recipe);

  // 3) render bookmark view
  bookmarksView.render(model.state.bookmarks);
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
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPageButtonClick(controlPagination);
}

init();