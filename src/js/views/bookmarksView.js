import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './View.js';

class BookmarksView extends View {
_parentElement = document.querySelector('.bookmarks__list');
_errorMessage = 'No bookmarks yet. Find recipe and make it bookmarked';
_SuccessMessage ='';

    addHandlerRender(handler){
        window.addEventListener('load', handler)
    }

//У родителя будет markup, но сам generateMarkup у разных дочерних будет разный
    _generateMarkup(){

        console.log(this._data)
        //Тут join чтобы соеденить их и были слитно
        return this._data
        .map(bookmark => previewView.render(bookmark, false))
        .join('')

       
    }

};

export default new BookmarksView();
