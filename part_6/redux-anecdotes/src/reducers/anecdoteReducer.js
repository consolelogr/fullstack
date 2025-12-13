
import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes"; //


export const vote = (id) => async (dispatch, getState) => { // HERE
  const state = getState();
  const anecdoteToVote = state.anecdotes.find((a) => a.id === id); // HERE
  const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }; // HERE
  await anecdoteService.update(id, updatedAnecdote); // HERE, needs update function in service
  dispatch(voteAnecdote(id));
};


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
      /*
      state.push({
        id: Math.floor(Math.random() * 1000000),
        content: action.payload,
        votes: 0,
      });
    }, */
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
  },
});

export const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions;



export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const addAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew({ content, votes: 0 });
  dispatch(createAnecdote(newAnecdote));
};

export default anecdoteSlice.reducer;






// ------------------------------
// previous working code from 6.9
// ------------------------------
/*
const initialState = anecdotesAtStart.map(asObject);

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    id,
  };
};

export const createAnecdote = (content) => {
  return {
    type: "CREATE",
    anecdote: {
      id: Math.floor(Math.random() * 1000000),
      content,
      votes: 0,
    },
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      return state.map((a) =>
        a.id === action.id ? { ...a, votes: a.votes + 1 } : a,
      );
    case "CREATE":
      return [...state, action.anecdote];

    default:
      console.log("state now: ", state);
      console.log("action", action);

      return state;
  }
};

export default reducer;
*/
