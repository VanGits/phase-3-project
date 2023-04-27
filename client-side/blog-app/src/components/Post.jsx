import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Post.css";
import { useHistory } from "react-router-dom";
import Comments from "./Comments";

const Post = ({ posts, onEditPost, onAddComment, comments, setComments }) => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

 

  const handleEditClick = (index) => {
    
    setTitle(posts[index].title);
    setContent(posts[index].content);
    setIsEditing(true);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitPatch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then((r) => r.json())
      .then((editedPost) => {
        onEditPost(editedPost);

        setTitle("");
        setContent("");
        alert("Submitted!");
        history.push("/");
      });
  };
  // Normal display of post
  const postDisplay = posts.map((post, index) => {
    if (post.id === parseInt(id)) {
      return (
        <div className="post-content" key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <button type="submit" onClick={() => handleEditClick(index)}>
            Edit
          </button>
        </div>
      );
    }
  });
  // Editing display (for users) of post
  const postEditDisplay = posts.map((post) => {
    if (post.id === parseInt(id)) {
      return (
        <form
          className="patch-form-content"
          onSubmit={handleSubmitPatch}
          key={post.id}
        >
          <input onChange={handleTitleChange} id="title" value={title} />
          <textarea
            onChange={handleContentChange}
            id="content"
            value={content}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }
  });
  return (
    <div className="Post">{isEditing ? postEditDisplay : postDisplay}<Comments onAddComment = {onAddComment} comments = {comments} setComments = {setComments}/></div>
  );
};

export default Post;
