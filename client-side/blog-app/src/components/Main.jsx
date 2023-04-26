import React from "react";
import "../styles/Main.css"
import { useHistory } from 'react-router-dom';

const Main = ({posts}) => {

    
    const history = useHistory()
    

    
    const handleClick = (id) => {
        history.push(`/posts/${id}`)
    }

    return (
        <div className='Main'>
            <div className="main-wrapper">
            {posts.map((post) => {
                return (
                    <div className='post-wrapper' key={post.id} onClick={() => handleClick(post.id)}> 
                         <h2>{post.title}</h2>
                    </div>
                   
                )
            })}

            </div>
            
        </div>
    );
}

export default Main;
