
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import * as anecdoteService from './services/anecdotes';


const queryClient = new QueryClient();
const AnecdoteList = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAll,
    retry: false, // no  retries
  });
  if (result.isLoading) return <div>Loading anecdotes...</div>;
  if (result.isError)
    return <div>Anecdote service not available due to problems in server</div>;

const anecdotes = result.data;


  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => console.log('vote', anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        <AnecdoteList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
