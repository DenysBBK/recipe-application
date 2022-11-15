import icons from 'url:../../img/icons.svg';

//Это главный родитель. У всех классов будет метод render(), который принимает какие-то данные
//Для кождого дочернего будет разные данные, но метод один и тот же. И у каждого дочернего есть this._data
//Но _generateMarkup() и парентэлемент у каждого будет разный, по этому из мы как раз и опысываем в разных Вью
export default class View {
 

    _data;
    /**
     * Рендерю получаемый объект в ДОМ 
     * @param {Объект\массив объектов, который получаю} data, котороую нужно зарендерить(рецепт)
     * @param {Булевое значени, не обязательно} render, если false то просто сделать markup строку, а не дом
     * @returns {undefined | строку} строка вернется, если render = false
     * @this {Object}, то есть this прикрепляется с View;
     * @author Denys Babenko
     * @todo Закончить внедрение всех фишек
     */
    render(data, render = true){
      //Мы проверяем есть ли данные или если это массив и его длинна равна нулю
      if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();


        this._data = data;
        const markup = this._generateMarkup();
        if(!render) return markup;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function(){
        const markup = `
        <div class="spinner">
                    <svg>
                      <use href="${icons}#icon-loader"></use>
                    </svg>
                  </div>
                  `
        this._parentElement.innerHTML ='';
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderError(message = this._errorMessage){
      const markup = `
      <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
      </div>`
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMessage(message = this._SuccessMessage){
      const markup = `
            <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    update(data){
     

      this._data = data;
      const newMarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));
      // console.log(curElements);
      // console.log(newElements);
//Тут я брал виртуальный дом, который изменяется после того, как я нажимаю на кнопки(порции больше и тд)
//И сравнивал его с актуальным ДОМ. Этот метод проверяет сравнение и выдает булевое значение
      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];
        // console.log(curEl, newEl.isEqualNode(curEl));

//Проверка на то, что все таки false и если этот елемент содержит именно текст
        if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '' ){
          // console.log("⛔", newEl.firstChild.nodeValue.trim())
          
          curEl.textContent = newEl.textContent;
        }
//Изменяю атрибуты, которые даны в дом
        if(!newEl.isEqualNode(curEl)){
          // console.log(newEl.attributes)
          // console.log(Array.from(newEl.attributes))
          
          Array.from(newEl.attributes).forEach(atrib => curEl.setAttribute(atrib.name, atrib.value))
          
        }
        
      })
      
      



    }


}