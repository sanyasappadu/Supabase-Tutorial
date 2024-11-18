import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Profile from "./pages/Profile";
import CreateTeam from "./pages/CreateTeam"
// import ThemedComponent from './ThemedComponent';
import { UserContext } from './UserContext';
import ReactDOM from "react-dom/client";

function App() {
  const { user, setUser } = useContext(UserContext);
  return (
    <BrowserRouter>
    {/* <UserContext.Provider value={user}> */}

      <nav>
        <h1>Cricket</h1>
        {/* <ThemedComponent /> */}
       
        <Link to="/">Home</Link>
        <Link to="/create">Create New Player</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/createTeam">Create team</Link>
        <input 
            type="checkbox" 
            id="user"
            checked={user}
            onChange={(e) => setUser(e.target.checked)}
          />
          {/* <button type="checkbox" id="user" checked={user} onClick={(e) => setUser(e.target.checked)}>Create Team</button> */}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createTeam" element={<CreateTeam />} />

      </Routes>
      {/* </UserContext.Provider> */}

    </BrowserRouter>
  );
}

export default App;
