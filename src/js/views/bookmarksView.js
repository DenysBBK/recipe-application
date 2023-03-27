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
    _generateMarkup(){

        console.log(this._data)
        return this._data
        .map(bookmark => previewView.render(bookmark, false))
        .join('')

       
    }

};

export default new BookmarksView();
