import React, { useState } from "react";
import "../styles/Comments.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Comments = ({onAddComment, comments, setComments, url}) => {
  const { id } = useParams();
  const history = useHistory();

  
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  // Get comments from each post
  useEffect(() => {
    fetch(`${url}/posts/${id}/comments`)
    .then((res) => res.json())
    .then((commentsData) => setComments(commentsData));
  }, []);

  const handleCommentChange = (e) => {
    setBody(e.target.value)
  }
  const handleUserChange = (e) => {
    setName(e.target.value)
  }
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
        alert("Please fill in the input fields!")
    }
  }

  
  return (
    <div className="Comments">
       <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={handleUserChange} value={name}/>
        <textarea type="textarea" placeholder="Comment" onChange={handleCommentChange} value={body}/>
        <button>Submit</button>
      </form>
      <h1>Comments</h1>
      {comments.map((comment) => {
        return (
            <div className="comment">
                <h2>{comment.name} says</h2>
                <p>{comment.body}</p>
            </div>
        )
      })}
     
    </div>
  );
};

export default Comments;
