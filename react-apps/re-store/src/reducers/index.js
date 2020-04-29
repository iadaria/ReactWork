const initialState = {
    books:  [],
    loading: true,
    error: null,
    cartItems: [],//{ id: 1, name: 'Book 1', count: 3, total: 140},{ id: 2, name: 'Book 2', count: 4, total: 240, 
    orderTotal: 0,
};

const updateCartItems = (cartItems, item, idx) => {

    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ];
    }

    if(idx === -1) {//new element
        return [
            ...cartItems,
            item
        ];
    }

    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ];
};

const updateCartItem  = (book, item = {}, quantity) => { //if item undefind

    const { id = book.id, count = 0, title = book.title, total = 0 } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    };
};

const updateOrder = (state, bookId, quantity) => {
    
    const { books, cartItems, orderTotal } = state;

    const book = books.find(({id}) => id === bookId);
    const itemIndex = cartItems.findIndex(({id}) => id === bookId);
    const item = cartItems[itemIndex]; // if not found then undefind

    const newItem = updateCartItem(book, item, quantity);
    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIndex, quantity),
        orderTotal: orderTotal + newItem.total
    };
};

const reducer = (state = initialState, action) => {

    //Для каждого действия которое получем выводим тип
    //Самый простой способ для тестирования
    //только что созданного action
    //console.log(action.type + 'with payload ' + action.payload);

    switch(action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [], //or books: state.books,
                loading: true,
                error: null,
                //cartItems: state.cartItems,
                //orderTotal: state.orderTotal,
            };

        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null,
            };

        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload,
            };  

        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload, 1);

        case 'BOOK_REMOVED_FROM_CART':
            return updateOrder(state, action.payload, -1);

        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.cartItems.find(({id}) => id === action.payload);
            return updateOrder(state, action.payload, -item.count);
        
        default:
            return state;
    }
};

export default reducer;