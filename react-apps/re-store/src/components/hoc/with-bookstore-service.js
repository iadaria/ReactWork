import React from 'react';
import { BookstoreServiceConsumer } from '../bookstore-service-context'; //dependency injection

const withBookstoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <BookstoreServiceConsumer>
                {
                    (bookstoreService) => {
                        //const serviceProps = mapMethodsToProps(bookstoreService);
                        return (
                            <Wrapped {...props} bookstoreService={bookstoreService}/>
                        );
                    }
                }
            </BookstoreServiceConsumer>
        );
    };
};
/* const withBookstoreService = (mapMethodsToProps) => (Wrapped) => {
    return (props) => {
        return (
            <BookstoreServiceConsumer>
                {
                    (bookstoreService) => {
                        const serviceProps = mapMethodsToProps(bookstoreService);
                        return (
                            <Wrapped {...props} {...serviceProps}/>
                        );
                    }
                }
            </BookstoreServiceConsumer>
        );
    };
}; */

export default withBookstoreService;