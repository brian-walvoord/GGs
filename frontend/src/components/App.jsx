import '../sass/App.scss';
import React, { useState, useEffect } from "react";

function App() {

  const [hello, setHello] = useState(null);
  const [games, setGames] = useState(null);
  const [users, setUsers] = useState(null);

  const fetchGames = () => {
    fetch("/getGames")
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(res => setGames(res))
  };

  const fetchUsers = () => {
    fetch("/getUsers")
      .then(res => res.json())
      .then(res => setUsers(res))
  }

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(res => setHello(res))
  }, [])

  return (
    <div>
      <h1>Hello, World!</h1>
      <h1>{hello}</h1>
      <button onClick={fetchGames}>Get Games</button>
      <button onClick={fetchUsers}>Get Users</button>
      {users ? users.map(user => <h1 key={user.id}>{JSON.stringify(user)}</h1>) : null}
      {games ? games.map(game => <h1 key={game.id}>{JSON.stringify(game)}</h1>) : null}
    </div>
  );
}

export default App;
