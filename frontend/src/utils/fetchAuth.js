async function login() {}

async function refresh() {
  const data = await fetch("http://alberdi.com:4000/auth/refresh-token", {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: "xxx==yyy",
    },
  });
  const parsedData = await data.json();
  return parsedData;
}

export { login, refresh };
