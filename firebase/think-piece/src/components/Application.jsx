import React, { Component } from 'react';

import { firestore, auth, createUserProfileDocument } from '../firebase';

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';
import Authentication from './Authentication';

class Application extends Component {
    state = {
        posts: [],
        user: null,
    };

    unsubscribeFromFirestore = null;
    unsubscribeFromAuth = null;

    componentDidMount = async () => {
        //const snapshot = await firestore.collection('posts').get();

        //listen every time then data changes
        this.unsubscribeFromFirestore = firestore.collection('posts').onSnapshot(snapshot => {
            const posts = snapshot.docs.map(collectIdsAndDocs);
            console.log('posts', posts);
            this.setState({ posts });
        });
        
        //when logout, login
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            const user = await createUserProfileDocument(userAuth);
            console.log('user from unsubscribeFromAuth', user);
            this.setState({ user });
        });

        /* snapshot.forEach(doc => {
            const id = doc.id;
            const data = doc.data();
            console.log({id , data});
        }); */ 
    }

    componentWillUnmount = () => {
        this.unsubscribeFromFirestore();
    }

    // handleCreate = async  post => {
    //     firestore.collection('posts').add(post)
    //     /* const { posts } = this.state;
    //     const docRef = await firestore.collection('posts').add(post);
    //     const doc = await docRef.get();
    //     const newPost = collectIdsAndDocs(doc);
    //     this.setState({ posts: [newPost, ...posts] }); */
    // };

    // handleRemove = async id => {
    //     firestore.doc(`posts/${id}`).delete();
    //     /* const allPosts = this.state.posts;
    //     console.log("delete with id", id);
    //     await firestore.doc(`posts/${id}`).delete();
    //     const posts = allPosts.filter(post => post.id !== id);
    //     this.setState({ posts }); */
    // };

    render() {
        const { posts, user } = this.state;

        return (
            <main className="Application">
                <h1>Think Piece</h1>
                <Authentication user={user} loading={false}/>
                <Posts 
                    posts={posts} 
                />
            </main>
        );
    }
}

export default Application;
