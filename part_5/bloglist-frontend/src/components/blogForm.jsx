// Put this component function INSIDE or ABOVE the main App component
const BlogForm = ({
  addBlog,
  newTitle, setNewTitle,
  newAuthor, setNewAuthor,
  newUrl, setNewUrl
}) => {
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm;