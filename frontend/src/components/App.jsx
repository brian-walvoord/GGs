import '../sass/App.scss';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserSelect from "./UserSelect";
import Games from "./Games";
import Users from "./Users";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Header from "./Header";

function App() {

  // states
  const [games, setGames] = useState(null);
  const [users, setUsers] = useState(null);
  const [usersFName, setUsersFName] = useState([]);
  const [gamePopup, setGamePopup] = useState(false);
  const [selection, setSelection] = useState(null);
  const [selectedUser, setSelectedUser] = useState("1");
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <UserSelect 
            setSelectedUser={setSelectedUser}
            usersFName={usersFName} 
            setUsersFName={setUsersFName} 
          />
        </Route>
        <Route path="/home">
          <Navbar setSelectedUser={setSelectedUser}/>
          <Homepage user={user} setUser={setUser} selectedUser={selectedUser} />
        </Route>
        <Route path="/games">
          <Navbar />
          <Games 
            selectedUser={selectedUser}
            games={games} 
            setGames={setGames} 
            gamePopup={gamePopup} 
            setGamePopup={setGamePopup}
            selection={selection}
            setSelection={setSelection}
            user={user}
            setUser={setUser}
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
