import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Post from "./components/Post";
import React, { useEffect, useState } from "react";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([]);
  const isLocalhost = window.location.hostname === "localhost";
  const url = isLocalhost
    ? "http://localhost:9292"
    : "https://phase-3-back-end.onrender.com";

  // Get all posts
  useEffect(() => {
    fetch(`${url}/posts`)
      .then((res) => res.json())
      .then((postData) => setPosts(postData));
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleEditPost = (editPost) => {
    const updatedPosts = posts.map((post) => {
      if (editPost.id === post.id) {
        return { ...post, ...editPost, comments: [...post.comments] };
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
  };

  const handleDeletePost = (id) => {
    const newPosts = posts.filter((post) => {
      return post.id !== id;
    });
    setPosts(newPosts);
  };

  const handleNewComment = (newComment) => {
    const updatedPostWithComments = posts.map((post) => {
      if (post.id === newComment.post_id) {
        return {
          ...post,
          comments: post.comments
            ? [...post.comments, newComment]
            : [newComment],
        };
      } else {
        return post;
      }
    });
    setPosts(updatedPostWithComments);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main posts={posts} onPostDelete={handleDeletePost} url={url} />
          </Route>
          <Route path="/posts/:id">
            <Post
              posts={posts}
              onEditPost={handleEditPost}
              url={url}
              onAddComment={handleNewComment}
            />
          </Route>
          <Route path="/create-post">
            <PostForm onAddPost={handleNewPost} url={url} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
