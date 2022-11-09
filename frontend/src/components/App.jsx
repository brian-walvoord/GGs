import '../sass/App.scss';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserSelect from "./UserSelect";
import Games from "./Games";
import Users from "./Users";
import Navbar from "./Navbar";
import Homepage from "./Homepage";

function App() {

  // states
  const [games, setGames] = useState(null);
  const [users, setUsers] = useState(null);
  const [usersFName, setUsersFName] = useState([]);
  const [gamePopup, setGamePopup] = useState(false);
  const [selection, setSelection] = useState(null);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UserSelect 
            usersFName={usersFName} 
            setUsersFName={setUsersFName} 
          />
        </Route>
        <Route path="/home">
          <Navbar />
          <Homepage />
        </Route>
        <Route path="/games">
          <Navbar />
          <Games 
            games={games} 
            setGames={setGames} 
            gamePopup={gamePopup} 
            setGamePopup={setGamePopup}
            selection={selection}
            setSelection={setSelection}
          />
        </Route>
        <Route path="/users">
          <Navbar />
          <Users 
            users={users} 
            setUsers={setUsers}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
