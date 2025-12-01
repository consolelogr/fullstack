import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/blogForm";
import Notification from "./components/Notifications";
import "./index.css";
import Togglable from "./components/Togglable";
import { useRef } from "react";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const blogFormRef = useRef();

  const updateBlog = async (updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(
        updatedBlog.id,
        updatedBlog,
      );
      console.log("Returned from backend:", returnedBlog);

      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? returnedBlog : b)));
    } catch (err) {
      console.error(err);
      setErrorMessage("Could not update blog");
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  // => added delete handler
  const removeBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await blogService.remove(id); // => calls backend delete
      setBlogs(blogs.filter((b) => b.id !== id)); // => remove from state
    } catch (error) {
      console.error(error);
    }
  };

  const LoginForm = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
  }) => {
    return (
      // 1. Connect the form directly to the handleLogin prop

      <form onSubmit={handleLogin}>
        <Notification message={errorMessage} />

        <div>
          username <br />
          <input
            data-testid="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <br />
          password <br />
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <br />
        <button type="submit">login</button>
      </form>
    );
  };

  const handleAddBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));

      setErrorMessage(
        `a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
      );

      setTimeout(() => setErrorMessage(null), 4000);
    } catch (error) {
      setErrorMessage("failed to create blog");
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  // Load blogs only when user is logged in
  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  // Restore logged user from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      // store to state
      setUser(user);
      setUsername("");
      setPassword("");

      // persist to localStorage
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));

      // give blogs service the token
      blogService.setToken(user.token);
    } catch (error) {
      setErrorMessage("wrong credentials");

      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedAppUser");
    blogService.setToken(null);
    setUser(null);
  };

  if (user === null) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  /*
  return (
    <div>
      <h2>BLOGS</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
          logout
        </button>
      </p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
*/

  // Inside the 'return' block of App.js (when user is NOT null)

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
          logout
        </button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={handleAddBlog}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newAuthor={newAuthor}
          setNewAuthor={setNewAuthor}
          newUrl={newUrl}
          setNewUrl={setNewUrl}
        />
      </Togglable>

      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  );
};
export default App;
