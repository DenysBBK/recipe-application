import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SECONDS } from './config.js';


import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';



if(module.hot){
  module.hot.accept()
};



// const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////




const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1)
    // console.log(id);

    if(!id) return;
    
    recipeView.renderSpinner();

//Делаем так, выбранный рецепт подсвечивался даже если мы убрали мышку от него
    resultsView.update(model.getSearchResultsPage());

     //Обновляем вид избранного
     bookmarksView.update(model.state.bookmarks);

    //Загружаем рецепт
    await model.loadRecipe(id);

    //Исполняем рецепт

    recipeView.render(model.state.recipe); 
   
    

  }catch(err){

    recipeView.renderError();
    console.error(err)
    
    
  }
};

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();
    // console.log(resultsView)
    
    //Получил результат поиска
    const query = searchView.getQuery();
    if(!query) return

//Прогрузил результаты поиска
    await model.loadSearchResults(query);

  //Вывел в консоль
    // console.log(model.state.search.results);


    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    //Выводим кнопки для нумерации страниц

    paginationView.render(model.state.search)

  }catch(err){
    console.log(err)
    
  }
};


const controlPagination = function(goToPage){
  
  //Получаем новые кнопки
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Выводим новые кнопки для нумерации страниц

  paginationView.render(model.state.search)
  
};


const controlServings = function(newServings){
  //Изменять количество порций в рецепте (in state)
  model.updateServings(newServings);
//Вставил, так как мы будем весь вид рецепта менять из-за увеличения порций
  // recipeView.render(model.state.recipe); 


  //Изменять вид рецепта(только текст\вид рецепта в ДОМ)
  recipeView.update(model.state.recipe); 
};


const controlAddBookmark = function(){
  //Добавляем или удаляем из избранного
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  //Изменяем вид рецепта
  recipeView.update(model.state.recipe)

  //Обрабатываем вид избранного
  bookmarksView.render(model.state.bookmarks)
  
};

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
};

const controlAddRecipe = async function(newRecipe){
  try{
    addRecipeView.renderSpinner();


   await model.uploadRecipe(newRecipe);
   console.log(model.state.recipe);

//Вывожу рецепт на экран
   recipeView.render(model.state.recipe);
//Сообщение, что рецепт был добавлен
   addRecipeView.renderMessage()

   
//Изменить вид избранного
bookmarksView.render(model.state.bookmarks)

//Изменяю id в урле. Использую это, чтобы айди рецепта, который только что создал сразу был в урле
window.history.pushState(null,'',`#${model.state.recipe.id}`);


//Закрываю форму через какое-то время
setTimeout(function(){
  addRecipeView.toggleWindow();
}, MODAL_CLOSE_SECONDS * 1000)
    
  }catch(err){
    console.log('☣️', err);
    addRecipeView.renderError(err.message)
    
  }
}


// controlRecipes();
const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHadlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes)
















