import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  // => added removeBlog and user props
  const [visible, setVisible] = useState(false);

  const handleLike = () => {
    updateBlog({
      id: blog.id,
      likes: blog.likes + 1,
    });
  };

  // => added: check if logged-in user owns this blog
  const canDelete = user && blog.user && blog.user.username === user.username;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} data-blog-id={blog.id} className="blog-basic">
      <div>
        <div>
          {blog.title} — {blog.author}
          <button onClick={() => setVisible(!visible)}>
            {visible ? "hide" : "view"}
          </button>
        </div>

        {visible && (
          <div className="blog-details">
            <div>{blog.url}</div>
            // bloglist-frontend/src/components/Blog.jsx
            <div>
              likes <span data-testid="likes-count">{blog.likes}</span>
              <button onClick={handleLike}>like</button>
            </div>
            <div>{blog.user?.name}</div>
            {/* => added delete button inside details */}
            {canDelete && (
              <button onClick={() => removeBlog(blog.id)}>delete</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
