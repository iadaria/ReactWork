import React, { useContext } from 'react'
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from './providers/PostsProvider';
import { UserContext } from './providers/UserProvider';

const Posts = () => {
    const posts = useContext(PostsContext);
    const user = useContext(UserContext);
    //console.log('Posts, user', user);
    return (
        <section className="Posts">

            <div>
                <h2>Add new post</h2>
                <AddPost />
            </div>

            <h1>Posts</h1>
            {/* <PostsContext.Consumer> */}
            {posts.map(post => <Post {...post} key={post.id} />)}
            {/*</PostsContext.Consumer> */}
        </section>
    )
}

export default Posts;
