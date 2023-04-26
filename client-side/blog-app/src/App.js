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
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main posts={posts} />
          </Route>
          <Route path="/posts/:id">
            <Post posts={posts}/>
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
