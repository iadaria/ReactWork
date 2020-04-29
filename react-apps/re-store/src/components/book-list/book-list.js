import React, { Component } from 'react'
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import './book-list.css';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
//import { booksLoaded, booksRequested, booksError } from '../../actions';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import ErrorIndicator from '../error-indicator';
//import { bindActionCreators } from 'redux';

const BookList = ({ books, onAddedToCart }) => {
    return (
        <ul className="book-list">
            {
                books.map(book => {
                    return (
                        <li key={book.id}>
                            <BookListItem 
                                book={book}
                                onAddedToCart={() => onAddedToCart(book.id)}
                                />
                        </li>
                    );
                })
            }
        </ul>
    );
};

class BookListContainer extends Component {
    
    componentDidMount() {
        //1. receive data
        //2. dispath action to store
        this.props.fetchBooks();
        /* const { 
            bookstoreService, 
            booksLoaded,
            booksRequested,
            booksError } = this.props;
        
        booksRequested();
        bookstoreService.Books
            .then(data => booksLoaded(data))
            .catch(error => booksError(error)); */
            //this.props.booksLoaded(data);
    }

    render() {
        const { books, loading, error, onAddedToCard } = this.props;

        if (loading) {
            return <Spinner />;
        }
        
        if (error) {
            return <ErrorIndicator />;
        }

        return <BookList books={books} onAddedToCart={onAddedToCard}/>;
    }
};

const mapStateToProps = ({ bookList: { books, loading, error }}) => {
    return { books, loading, error
       /*  books: state.books,
        loading: state.loading,
        error: state.error, */
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        //onAddedToCard: (id) => console.log(`on added to card ${id}`), //test
        onAddedToCard: (id) => dispatch(bookAddedToCart(id))
    };
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);

/* export default withBookstoreService()(
    connect(mapStateToProps, mapDispatchToProps)(BookList)
); */

// 1
/* = (dispatch) => {
    return bindActionCreators({
        booksLoaded
    }, dispatch);

    return {
        booksLoaded: (newBooks) => {
            dispatch(
            // {
            //     type: 'BOOKS_LOADED',
            //     payload: newBooks
            // }
            booksLoaded(newBooks));
        }
    };
}; */

// 2
   /*  return {
        fetchBooks: () => {
            console.log('fetching books');
            dispatch(booksRequested());
            bookstoreService.Books
                .then(data => dispatch(booksLoaded(data)))
                .catch(error => dispatch(booksError(error)));
            //this.props.booksLoaded(data);
        }
    }; */
   /*  booksLoaded,
    booksRequested,
    booksError, */