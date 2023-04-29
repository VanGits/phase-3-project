import React, { useState } from "react";
import "../styles/Comments.css";
import { useParams } from "react-router-dom";

const Comments = ({ onAddComment, url, posts = [] }) => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const handleCommentChange = (e) => {
    setBody(e.target.value);
  };
  const handleUserChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (body.length > 0 && name.length > 0) {
      fetch(`${url}/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          body: body,
        }),
      })
        .then((r) => r.json())
        .then((newComment) => {
          onAddComment(newComment);

          setName("");
          setBody("");
          alert("Submitted!");
          //   history.push("/")
        });
    } else {
      alert("Please fill in the input fields!");
    }
  };

  const postComments = posts.map((post) => {
    if (post.id === parseInt(id) && post.comments) {
      const comments = post.comments.map((comment) => {
        return (
          <div className="comment" key={comment.id}>
            <h2>{comment.name} says</h2>
            <p>{comment.body}</p>
          </div>
        );
      });
      return comments;
    } else {
      return null;
    }
  });

  return (
    <div className="Comments">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={handleUserChange}
          value={name}
        />
        <textarea
          type="textarea"
          placeholder="Comment"
          onChange={handleCommentChange}
          value={body}
        />
        <button>Submit</button>
      </form>
      <h1>Comments</h1>
      {postComments}
    </div>
  );
};

export default Comments;
