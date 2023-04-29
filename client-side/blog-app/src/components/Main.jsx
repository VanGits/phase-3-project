import React from "react";
import "../styles/Main.css";
import { useHistory } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Main = ({ posts, onPostDelete, url }) => {
  const history = useHistory();

  const handlePostClick = (id) => {
    history.push(`/posts/${id}`);
  };
  const handleNewPostClick = () => {
    history.push("/create-post");
  };

  const handleDelete = (id) => {
    fetch(`${url}/posts/${id}`, {
      method: "DELETE",
    });

    onPostDelete(id);
  };

  return (
    <div className="Main">
      <div className="main-wrapper">
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <RxCross2
                className="delete"
                onClick={() => handleDelete(post.id)}
              />
              <div
                className="post-wrapper"
                onClick={() => handlePostClick(post.id)}
              >
                <h2>{post.title}</h2>
              </div>
            </div>
          );
        })}
        <div
          className="post-wrapper add-post"
          onClick={() => handleNewPostClick()}
        >
          <h1>+</h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
