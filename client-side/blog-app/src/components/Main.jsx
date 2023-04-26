import React from "react";
import "../styles/Main.css";
import { useHistory } from "react-router-dom";

const Main = ({ posts }) => {
  const history = useHistory();

  const handlePostClick = (id) => {
    history.push(`/posts/${id}`);
  };
  const handleNewPostClick = () => {
    history.push('/create-post')
  }

  return (
    <div className="Main">
      <div className="main-wrapper">
        {posts.map((post) => {
          return (
            <div
              className="post-wrapper"
              key={post.id}
              onClick={() => handlePostClick(post.id)}
            >
              <h2>{post.title}</h2>
            </div>
          );
        })}
        <div className="post-wrapper add-post" onClick={() => handleNewPostClick()}>
          <h1>+</h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
