import React, { useContext } from 'react'
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from './providers/PostsProvider';

const Posts = () => {
    const posts = useContext(PostsContext);
    return (
        <section className="Posts">
            <AddPost />
            {/* <PostsContext.Consumer> */}
            { posts.map(post => <Post {...post} key={post.id} />) }
            {/* </section></PostsContext.Consumer> */}
        </section>
    )
}

export default Posts;
