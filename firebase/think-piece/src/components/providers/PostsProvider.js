import React, { Component, createContext, Children  } from 'react';
import { firestore } from '../../firebase';
import { collectIdsAndDocs } from '../../utilities';

export const PostsContext = createContext();

class PostsProvider extends Component {
    unsubscribeFromFirestore = null;

    componentDidMount = async () => {
        this.unsubscribeFromFirestore = firestore.collection('posts').onSnapshot(snapshot => {
            const posts = snapshot.docs.map(collectIdsAndDocs);
            console.log('posts', posts);
            this.setState({ posts });
        });
    };
      
    componentWillUnmount = () => {
        this.unsubscribeFromFirestore();
    }

    render() {
        const { posts } = this.state;
        const { children } = this.state;

        return (
            <PostsContext.Provider  value={posts}>
                {children}
            </PostsContext.Provider>
        );
    }
}

export default PostsProvider;