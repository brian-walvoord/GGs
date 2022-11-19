import '../sass/layout/App.scss';
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserSelect from "./UserSelect";
import Games from "./Games";
import Library from "./Library";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Header from "./Header";
import Signup from "./Signup";

function App() {

  // states
  const [games, setGames] = useState(null);
  const [gamePopup, setGamePopup] = useState(false);
  const [libraryPopup, setLibraryPopup] = useState(false);
  const [selection, setSelection] = useState(null);
  const [selectedUser, setSelectedUser] = useState("1"); // <-- this is what is causing it to default to 1. Find way to store user (JWT?)
  const [user, setUser] = useState("");
  const [library, setLibrary] = useState(null);
  const [userCreated, setUserCreated] = useState(false);

  // testing with these states for lists
  const [wishlist, setWishlist] = useState(null);
  const [notYetPlayed, setNotYetPlayed] = useState(null);
  const [played, setPlayed] = useState(null);

  return (
    <div className="app-container">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<UserSelect setSelectedUser={setSelectedUser} userCreated={userCreated}/>} />
          <Route path="/home" element={<><Navbar setUser={setUser}/>
            <Homepage 
              user={user} 
              setUser={setUser} 
              selectedUser={selectedUser}
            /></>} />
          <Route path="/games" element={<>
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
          </>} />
          <Route path="/library" element={<>
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
          </>} />
          <Route path="/signup" element={<Signup setUserCreated={setUserCreated}/>} />
        </Routes>
      <div className="background"></div>
    </div>
  );
}

export default App;