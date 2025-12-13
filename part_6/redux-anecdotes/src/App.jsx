
import "./style.css";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//import { setAnecdotes } from "./reducers/anecdoteReducer";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    /*
    const fetchData = async () => {
      const res = await fetch("http://localhost:3001/anecdotes");
      const data = await res.json();
      dispatch(setAnecdotes(data));
    };
    fetchData();*/
        dispatch(initializeAnecdotes()); // HERE
  }, [dispatch]);

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
