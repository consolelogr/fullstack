const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await fetch(baseUrl);
  return response.json();
};
export const createNew = async (anecdote) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  });
  return response.json();
}

export const update = async (id, updatedAnecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedAnecdote),
  });
  return response.json();
};

export default { getAll, createNew, update };
