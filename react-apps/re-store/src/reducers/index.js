import updateBookList from './book-list';
import updateShoppingCart from './shopping-cart';

const reducer = (state, action) => {

    //Для каждого действия которое получем выводим тип
    //Самый простой способ для тестирования
    //только что созданного action
    //console.log(action.type + 'with payload ' + action.payload);
    return {
        bookList: updateBookList(state, action),
        shoppingCart: updateShoppingCart(state, action)
    };
};


export default reducer;