import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './View.js';

class ResultsView extends View {
_parentElement = document.querySelector('.results');
_errorMessage = 'There is no recipes found( Try another query';
_SuccessMessage;


_generateMarkup(){
    return this._data.map(result => previewView.render(result, false)).join('')
}


};

export default new ResultsView();
