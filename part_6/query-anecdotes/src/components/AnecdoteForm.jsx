import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 5) return;
    newAnecdoteMutation.mutate({ content, votes: 0 });
    setContent("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
