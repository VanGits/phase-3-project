puts "🌱 Seeding spices..."

# Seed your database here
3.times do |i|
    post = Post.create!(
      title: "Post #{i + 1} Title",
      content: "Post #{i + 1} Body"
    )
  
    # create 2 comments for each post
    2.times do |j|
      post.comments.create!(
        name: "Comment #{j + 1} Name",
        body: "Comment #{j + 1} Body"
      )
    end
  end

puts "✅ Done seeding!"
