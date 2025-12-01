import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create New</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            data-testid="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="write title here"
          />
        </div>

        <div>
          author:
          <input
            data-testid="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="write author here"
          />
        </div>

        <div>
          url:
          <input
            data-testid="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="write url here"
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
