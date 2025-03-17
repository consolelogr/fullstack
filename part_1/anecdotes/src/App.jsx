import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState(0);

  const handleVote = () => {
    setVotes(prevVotes => [...prevVotes.slice(0, selected), prevVotes[selected] + 1, ...prevVotes.slice(selected + 1)])
  }

  return (
    <div>
      <span style={{ fontSize: '1.5em', fontWeight: '700' }}>{selected}: </span> {anecdotes[selected]}
      <br></br><span>&#40;{votes[selected]} votes  &#41;</span><br /><br />

      <button onClick={
        () => setSelected(Math.floor(Math.random() * anecdotes.length))}>
        Next anecdote </button>

      <button onClick={handleVote}>
        Vote </button>

      <br /><br />

      Most votes:
      {!Math.max(...votes) ? (
        <p>No votes yet</p>
      ) : (
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      )}

      <p>All votes:&#32;
        {votes.map((count, index) => (
          <span key={index}>
            <br />
            {index}:{count} &#32;
          </span>
        ))}
      </p>
    </div>
  )
}

export default App
