import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const goToPage = +btn.dataset.goto;            
            handler(goToPage);
            

        })
    }

    _generateMarkup(){
        const currentPage = this._data.page
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        if(currentPage === 1 && numPages > 1){
             
            return `
        <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
        `  
        }

        if(currentPage === numPages && numPages > 1){
           
            return `
            <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
                            <svg class="search__icon">
                                <use href="${icons}#icon-arrow-left"></use>
                            </svg>
                            <span>Page ${currentPage - 1}</span>
                        </button>
            `
        }
        if(currentPage < numPages){
            
            return `
            <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
                            <svg class="search__icon">
                                <use href="${icons}#icon-arrow-left"></use>
                            </svg>
                            <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
            </button>
            `
            
        }
    //На первой странице и других страниц нет (мало рецептов)
        return ''    
    }
};

export default new PaginationView();


















//Тут подумать как реализовать
// if(currentPage === 1 && numPages > 1){
//     return this._generateBtnNext(currentPage)
     
//  }

// //Мы на последней странице
//  if(currentPage === numPages && numPages > 1){
//     return this._generateBtnPrev(currentPage)
//  }
// //Мы на какой-то случайной странице
//  if(currentPage < numPages){
//     this._generateBtnPrev(currentPage)
//      this._generateBtnNext(currentPage)
//  }
// //На первой странице и других страниц нет (мало рецептов)
//  return ''    
// }

// _generateBtnPrev(currP){
//  return `
//  <button class="btn--inline pagination__btn--prev">
//                  <svg class="search__icon">
//                      <use href="${icons}#icon-arrow-left"></use>
//                  </svg>
//                  <span>Page ${currP - 1}</span>
//              </button>
//  `
// }

// _generateBtnNext(currP){
//  return `
//  <button class="btn--inline pagination__btn--next">
//              <span>Page ${currP + 1}</span>
//              <svg class="search__icon">
//              <use href="${icons}#icon-arrow-right"></use>
//              </svg>
//          </button>
//  `
// }