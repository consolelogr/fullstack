import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import Notification from './components/Notifications'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


 const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  
  return (
    // 1. Connect the form directly to the handleLogin prop
    
    <form onSubmit={handleLogin}>
    <Notification message={errorMessage} />

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
  )
}

const handleAddBlog = async (event) => {
  event.preventDefault()

  try {
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    const returnedBlog = await blogService.create(newBlog)

    // update UI
    setBlogs(blogs.concat(returnedBlog))

    // SUCCESS NOTIFICATION
    setErrorMessage(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
    setTimeout(() => setErrorMessage(null), 4000)


    
    // clear fields
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  } catch (error) {
    // ERROR NOTIFICATION
    setErrorMessage('failed to create blog')
    setTimeout(() => setErrorMessage(null), 4000)
  }
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
              <Notification message={errorMessage} />


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

    <Notification message={errorMessage} />

    <p>
      {user.name} logged in
      <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
        logout
      </button>
    </p>

    <BlogForm 
      addBlog={handleAddBlog}
      newTitle={newTitle}
      setNewTitle={setNewTitle}
      newAuthor={newAuthor}
      setNewAuthor={setNewAuthor}
      newUrl={newUrl}
      setNewUrl={setNewUrl}
    />

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)
}
export default App
