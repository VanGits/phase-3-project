require 'sinatra'
class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/" do
    { message: "Good luck with your project!" }.to_json
  end
  # Get all posts
  get "/posts" do
    posts = Post.all

    posts.to_json
  end
  # Get all comments
  get "/comments" do

    comments = Comment.all

    comments.to_json

  end
  # Get a post
  get "/posts/:id" do
    post = Post.find(params[:id])

    post.to_json

  end
  # Get all comments in a post
  get "/posts/:id/comments" do
    post = Post.find(params[:id])
    comments = post.comments
    comments.to_json

  end

  # Get a comment in a post

  get "/posts/:post_id/comments/:comment_id" do
   
    post = Post.find(params[:post_id])

    comment = post.comments.where(id: params[:comment_id])

    comment.to_json



  end

  # Create a new post

  post "/posts" do

    post = Post.create(
      title: params[:title],
      content: params[:content]
    )
    post.to_json

  end
  # Create a new comment in a post
  post "/posts/:id/comments" do
    post = Post.find(params[:id])
    comment = post.comments.create(
      name: params[:name],
      body: params[:body]
    )
    comment.to_json
  end

  # Update a post

  patch "/posts/:id" do
    post = Post.find(params[:id])
    
    post.update(
      title: params[:title],
      content: params[:content]
    )
    post.to_json

  end

  # Update a comment in a post

  patch "/posts/:post_id/comments/:comment_id" do
    post = Post.find(params[:post_id])

    comment = post.comments.where(id: params[:comment_id])

    comment.update(
      name: params[:name],
      body: params[:body]
    )

    comment.to_json

  end

  # Delete a post

    delete "/posts/:id" do
      post = Post.find(params[:id])
      post.destroy
     

      post.to_json

    end

  # Delete a comment in a post

    delete "/posts/:post_id/comments/:comment_id" do
      post = Post.find(params[:post_id])

      comment = post.comments.where(id: params[:comment_id]).first
  
      comment.destroy
  
      comment.to_json
    end



  

end
