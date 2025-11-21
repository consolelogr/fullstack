import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const LoginForm = ({ handleLogin }) => {
 
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  // NEW STATE FOR BLOG FORM
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for username and password */}
      <button type="submit">login</button>
    </form>
  )
}

// Put this function inside the main App component
const handleAddBlog = (event) => {
  event.preventDefault()
  
  const newBlog = {
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  }

  // NOTE: The actual posting logic (blogService.create) will go here 
  // in the next step, once we ensure the service handles the token.
  
  console.log('Attempting to create blog:', newBlog)
  
  // Clear the form fields
  setNewTitle('')
  setNewAuthor('')
  setNewUrl('')
}



  // Load blogs only when user is logged in
  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  // Restore logged user from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      // store to state
      setUser(user)
      setUsername('')
      setPassword('')

      // persist to localStorage
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )

      // give blogs service the token
      blogService.setToken(user.token)

    } catch (error) {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  if (user === null) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Log in to application</h2>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <form onSubmit={handleLogin}>
          <div>
            username <br />
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            <br />
            password <br />
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <br />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

 /*
  return (
    <div>
      <h2>blogs</h2>
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
    <p>
      {user.name} logged in
      <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
        logout
      </button>
    </p>

    {/* RENDER THE NEW BLOG FORM HERE */}
    <BlogForm 
      addBlog={handleAddBlog}
      newTitle={newTitle}
      setNewTitle={setNewTitle}
      newAuthor={newAuthor}
      setNewAuthor={setNewAuthor}
      newUrl={newUrl}
      setNewUrl={setNewUrl}
    />
    {/* END RENDER */}

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

}
export default App
