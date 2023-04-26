import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Post from "./components/Post";
import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9292/posts")
      .then((res) => res.json())
      .then((postData) => setPosts(postData));
  }, []);
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
