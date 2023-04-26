import React, { useState } from 'react';
import "../styles/PostForm.css"
const PostForm = ({posts}) => {

    const [title, setTitle] = useState("title")
    const [content, setContent] = useState("")

    const handleTitleChange = (e) => {
        setTitle(e.target.innerText)
       
        
    }

    const handleContentChange = (e) => {
        setContent(e.target.innerText)
       
    }
    
    return (
        <div className='PostForm'>
            <form className="post-form-content">
                <input onChange={handleTitleChange} id='title' placeholder='Title'/>
                <textarea onChange={handleContentChange} id='content' placeholder='Content'/>
                <button type='submit'>Submit</button>
            </form>
            
        </div>
    );
}

export default PostForm;
