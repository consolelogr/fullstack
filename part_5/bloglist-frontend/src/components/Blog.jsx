import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

/*
const handleLike = () => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
              console.log("LIKE CLICKED, sending:", updatedBlog)  


  updateBlog(updatedBlog)
} 
*/


const handleLike = () => {
  updateBlog({
    id: blog.id,
    likes: blog.likes + 1
  })
}



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} — {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}

            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
