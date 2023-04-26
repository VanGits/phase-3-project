import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Post from "./components/Post";
import React, { useEffect, useState } from "react";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9292/posts")
      .then((res) => res.json())
      .then((postData) => setPosts(postData));
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const handleEditPost = (editPost) => {
    const updatedPosts = posts.map((post) => {
      if (editPost.id === post.id){
        return editPost
      } else {
        return post
      }
    })
    setPosts(updatedPosts)
  }

  const handleDeletePost = (id) => {
    const newPosts = posts.filter((post) => {
      return post.id !== id
    })
    setPosts(newPosts)

  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main posts={posts} onPostDelete={handleDeletePost} />
          </Route>
          <Route path="/posts/:id">
            <Post posts={posts} onEditPost = {handleEditPost}/>
          </Route>
          <Route path="/create-post">
            <PostForm onAddPost = {handleNewPost}/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
