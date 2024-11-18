import { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const {teamCount , setTeamCount } = useState(0);


  return (
      <UserContext.Provider value={{ user, setUser, teamCount, setTeamCount}}>
          {children}
      </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

