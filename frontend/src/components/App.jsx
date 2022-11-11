import '../sass/App.scss';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserSelect from "./UserSelect";
import Games from "./Games";
import Library from "./Library";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Header from "./Header";

function App() {

  // states
  const [games, setGames] = useState(null);
  const [gamePopup, setGamePopup] = useState(false);
  const [libraryPopup, setLibraryPopup] = useState(false);
  const [selection, setSelection] = useState(null);
  const [selectedUser, setSelectedUser] = useState("1");
  const [user, setUser] = useState("");
  const [library, setLibrary] = useState(null);

  return (
    <Router>
      <Header user={user} />
      <Switch>
        <Route exact path="/">
          <UserSelect setSelectedUser={setSelectedUser}/>
        </Route>
        <Route path="/home">
          <Navbar setUser={setUser}/>
          <Homepage 
            user={user} 
            setUser={setUser} 
            selectedUser={selectedUser} 
          />
        </Route>
        <Route path="/games">
          <Navbar setUser={setUser} />
          <Games 
            games={games} 
            setGames={setGames} 
            gamePopup={gamePopup} 
            setGamePopup={setGamePopup}
            selection={selection}
            setSelection={setSelection}
            user={user}
          />
        </Route>
        <Route path="/library">
          <Navbar setUser={setUser} />
          <Library 
            selection={selection}
            setSelection={setSelection}
            setLibraryPopup={setLibraryPopup}
            libraryPopup = {libraryPopup}
            user={user}
            library={library}
            setLibrary={setLibrary}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;