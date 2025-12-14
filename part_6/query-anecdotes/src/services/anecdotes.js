const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await fetch(baseUrl);
  return res.json();
};

export const createNew = async (anecdote) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  });
  return res.json();
};

export const update = async (anecdote) => {
  const res = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  });
  return res.json();
};
