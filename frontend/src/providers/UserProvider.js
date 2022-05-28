import { createContext, useEffect, useState } from "react";
import { refresh } from "../utils/fetchAuth";

export const UserContext = createContext({
  setUser: () => {},
  id: null,
  email: null,
  tokenExpiration: null,
});

function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: null,
    email: null,
    tokenExpiration: null,
  });
  useEffect(() => {
    console.log("UserProvided Reloaded");
    const fetchRefresh = async () => {
      const response = await refresh();
      setUser((user) => ({
        ...user,
        id: response.user._id,
        email: response.user.email,
        tokenExpiration: response.token_expiration,
      }));
    };
    fetchRefresh();
  }, []);
  return (
    <UserContext.Provider
      value={{
        setUser,
        ...user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
