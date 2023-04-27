import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Post from "./components/Post";
import React, { useEffect, useState } from "react";
import PostForm from "./components/PostForm";



function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([])
  const isLocalhost = window.location.hostname === 'localhost';
  const url = isLocalhost ? 'http://localhost:9292' : 'https://phase-3-back-end.onrender.com';
  
 

  // Get all posts
  useEffect(() => {
    fetch(`${url}/posts`)
      .then((res) => res.json())
      .then((postData) => setPosts(postData));
  }, []);
  

  // Get all comments

  useEffect(() => {
    fetch(`${url}/comments`)
      .then((res) => res.json())
      .then((commentsData) => setComments(commentsData));
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

  const handleNewComment = (newComment) => {
    
    setComments([...comments, newComment])
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main posts={posts} onPostDelete={handleDeletePost} url = {url} />
          </Route>
          <Route path="/posts/:id">
            <Post posts={posts} onEditPost = {handleEditPost} setComments = {setComments} comments = {comments} onAddComment={handleNewComment} url ={url}/>
          </Route>
          <Route path="/create-post">
            <PostForm onAddPost = {handleNewPost} url = {url}/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
