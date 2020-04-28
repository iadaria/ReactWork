import React, { Component } from 'react'
import BookListItem from '../book-list-item';
import './book-list.css';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';
//import { bindActionCreators } from 'redux';

class BookList extends Component {
    
    componentDidMount() {
        //1. receive data
        //2. dispath action to store
        const { bookstoreService } = this.props;
        const data = bookstoreService.Books;
        console.log(data);

        this.props.booksLoaded(data);
    }

    render() {
        const { books } = this.props;
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
        books: state.books
    };
};

const mapDispatchToProps  = {
    booksLoaded
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