import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './View.js';

class ResultsView extends View {
_parentElement = document.querySelector('.results');
_errorMessage = 'There is no recipes found( Try another query';
_SuccessMessage;


//У родителя будет markup, но сам generateMarkup у разных дочерних будет разный
_generateMarkup(){
    // console.log(this._data)
    //Тут join чтобы соеденить их и были слитно
    return this._data.map(result => previewView.render(result, false)).join('')
}


};

export default new ResultsView();
