import React from "react";
import "../styles/Main.css"

const Main = ({posts}) => {

    

    

    
    const handleClick = () => {

    }

    return (
        <div className='Main'>
            <div className="main-wrapper">
            {posts.map((post) => {
                return (
                    <div className='post-wrapper' key={post.id} onClick={handleClick}> 
                         <h2>{post.title}</h2>
                    </div>
                   
                )
            })}

            </div>
            
        </div>
    );
}

export default Main;
