import React, { useEffect, useState } from 'react';
import "../styles/Main.css"

const Main = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/posts")
        .then(res => res.json())
        .then(postData => setPosts(postData))
    }, [])

    


    return (
        <div className='Main'>
            <div className="main-wrapper">
            {posts.map((post) => {
                return (
                    <div className='post-wrapper' key={post.id}> 
                         <h1>{post.title}</h1>
                    </div>
                   
                )
            })}

            </div>
            
        </div>
    );
}

export default Main;
