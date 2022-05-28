async function getAll() {
  const data = await fetch("http://alberdi.com:4000/media", {
    method: "GET",
    credentials: "include",
  });
  const parsedData = await data.json();
  return parsedData;
}

export { getAll };
