import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as anecdoteService from "../services/anecdotes";

const AnecdoteList = () => {
  const queryClient = useQueryClient();

  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAll,
    retry: false,
  });

  const voteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(["anecdotes"], (oldAnecdotes) =>
        oldAnecdotes.map((a) =>
          a.id === updatedAnecdote.id ? updatedAnecdote : a
        )
      );
    },
  });




  const handleVote = (anecdote) => {
    const updated = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate(updated);
  };


  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>Anecdote service not available</div>;

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
