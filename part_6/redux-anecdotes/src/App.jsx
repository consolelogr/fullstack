import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { voteAnecdote, createAnecdote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/anecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  /*const vote = (id) => {
    dispatch({ type: "VOTE", id });
    console.log("vote", id);
    };*/
  const vote = (id) => {
    dispatch(voteAnecdote(id)); // Action creator
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
      <AnecdoteForm />
    </div>
  );
};

export default App;
