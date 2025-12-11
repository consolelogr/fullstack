import { useSelector, useDispatch } from "react-redux";
import "./style.css";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({ type: "VOTE", id });
    console.log("vote", id);
  };
  const addAnecdote = (event) => {
    // --> new function
    event.preventDefault();
    const content = event.target.anecdote.value;

    const newAnecdote = {
      id: Math.floor(Math.random() * 1000000),
      content,
      votes: 0,
    };
    dispatch({ type: "CREATE", anecdote: newAnecdote });
    event.target.anecdote.value = "";
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
