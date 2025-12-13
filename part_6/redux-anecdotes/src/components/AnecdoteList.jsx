import { useSelector, useDispatch } from "react-redux";
//import { voteAnecdote } from "../reducers/anecdoteReducer";
import { vote } from "../reducers/anecdoteReducer";
import Filter from "./Filter";



const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(vote(id));   };

  const filtered = anecdotes.filter(
    (a) => a.content.toLowerCase().includes(filter.toLowerCase()),
  );


  const sortedAnecdotes = [...filtered].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
