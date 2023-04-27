import React, { useState } from "react";
import "../styles/PostForm.css";
import { useHistory } from "react-router-dom";
const PostForm = ({ onAddPost, url }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();

    if (title.length > 0 && content.length > 0) {
      fetch(`${url}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      })
        .then((r) => r.json())
        .then((newPost) => {
          onAddPost(newPost);

          setTitle("");
          setContent("");
          alert("Submitted!");
          history.push("/");
        });
    } else {
        alert("Please fill in the input fields!")
    }
  };

  return (
    <div className="PostForm">
      <form className="post-form-content" onSubmit={handleSubmitPost}>
        <input onChange={handleTitleChange} id="title" placeholder="Title" />
        <textarea
          onChange={handleContentChange}
          id="content"
          placeholder="Content"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
