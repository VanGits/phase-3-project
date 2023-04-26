import React from 'react';
import { useParams } from 'react-router-dom';
import "../styles/Post.css"

const Post = ({posts}) => {

    const { id } = useParams()

    

    

    const postDisplay = posts.map((post) => {

        
        if (post.id === parseInt(id)){
            console.log(post)
            return (
                <div className='post-content' key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
            )
        } 
    })
    return (
        <div className='Post'>
            {posts.length != 0 ? postDisplay: console.log("waiting")}
        </div>
    );
}

export default Post;
