class SearchView {
_parentElement = document.querySelector('.search');

    getQuery(){
        const query = this._parentElement.querySelector('.search__field').value
        this._clearInput();
        return query
    }

    _clearInput(){
        this._parentElement.querySelector('.search__field').value = ''
    }
//Тут мы слушаем форму. По этому submit будет значить, что юзер или кликнет на кнопку
//или нажмет энтер
    addHandlerSearch(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            handler()
            
            
        })
    } 
};

export default new SearchView();