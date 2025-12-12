import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  /*const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    event.target.anecdote.value = "";
    };*/

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote.content));
    event.target.anecdote.value = "";
  };


  return (
    <div>
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

export default AnecdoteForm;
