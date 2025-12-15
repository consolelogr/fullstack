import { useState } from 'react'
import "./style.css"
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useMatch,
  useNavigate
} from 'react-router-dom'

import { useField } from './hooks/index.js'


const Menu = ({ anecdotes, addNew, setNotification }) => {
  const padding = { paddingRight: 5 }

  return (
    <>
      <div>
        <Link style={padding} to="/anecdotes">Anecdotes</Link>
        <Link style={padding} to="/createnew">Create new</Link>
        <Link style={padding} to="/about">About</Link>
      </div>

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/createnew"
          element={
            <CreateNew
              addNew={addNew}
              setNotification={setNotification}
            />
          }
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
      </Routes>
    </>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  if (!anecdote) return null

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>
        More info: <a href={anecdote.info}>{anecdote.info}</a>
      </p>
      <p>Votes: {anecdote.votes}</p>
    </div>
  )
}

const CreateNew = ({ addNew, setNotification }) => {
  const navigate = useNavigate()

  //const [content, setContent] = useState('')
  //const [author, setAuthor] = useState('')
  //const [info, setInfo] = useState('')
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const { reset: contentReset, ...contentInput } = content
  const { reset: authorReset, ...authorInput } = author
  const { reset: infoReset, ...infoInput } = info

  const handleSubmit = (e) => {
    e.preventDefault()

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })


    setNotification(`a new anecdote "${content.value}" created`)
    setTimeout(() => setNotification(''), 5000)

    navigate('/anecdotes')
  }

  const handleReset = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentInput} />



        </div>
        <div>
          author
          <input {...authorInput} />
        </div>
        <div>
          url for more info
          <input {...infoInput} />

        </div>
        <button>create</button>

      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  )
}

const Footer = () => (
  <div className="footer">Footer is here!</div>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }



  const Notification = ({ message }) => {
    if (!message) return null
    return <div className="notifications" >{message}</div>
  }

  return (
    <Router>

      <Menu
        anecdotes={anecdotes}
        addNew={addNew}
        setNotification={setNotification}
      />

      <Notification className="notifications" message={notification} />
      <Footer />
    </Router>
  )
}

export default App
