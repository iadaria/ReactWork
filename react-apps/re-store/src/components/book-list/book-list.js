import React, { Component } from 'react'
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import './book-list.css';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils';
import ErrorIndicator from '../error-indicator';
//import { bindActionCreators } from 'redux';

class BookList extends Component {
    
    componentDidMount() {
        //1. receive data
        //2. dispath action to store
        const { 
            bookstoreService, 
            booksLoaded,
            booksRequested,
            booksError } = this.props;
        
        booksRequested();
        bookstoreService.Books
            .then(data => booksLoaded(data))
            .catch(error => booksError(error));
            //this.props.booksLoaded(data);
    }

    render() {
        const { books, loading, error } = this.props;

        if (loading) {
            return <Spinner />;
        }
        
        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <ul className="book-list">
                {
                    books.map(book => {
                        return (
                            <li key={book.id}>
                                <BookListItem book={book}/>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        books: state.books,
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps  = {
    booksLoaded,
    booksRequested,
    booksError,
};
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

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);

/* export default withBookstoreService()(
    connect(mapStateToProps, mapDispatchToProps)(BookList)
); */