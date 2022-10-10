const baseUrl = 'http://localhost:3000/api/entries'

export const getEntriesAPI = async () => {
  const resp = await fetch(baseUrl);
  return await resp.json();
}

export const postEntriesAPI = async (newEntry) => {
  // console.log(JSON.stringify(newEntry));
  const resp = await fetch(baseUrl, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(newEntry),
  });
  return await resp.json()
}

export const putEntriesAPI = async ({ _id, ...rest }) => {
  // const { id, ...rest } = entry;
  const resp = await fetch(`${baseUrl}/${_id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(rest),
  });
  return await resp.json();
}

export const getEntryAPI = async ({_id}) => {
  const resp = await fetch(`${baseUrl}/${_id}`);
  return await resp.json();
}