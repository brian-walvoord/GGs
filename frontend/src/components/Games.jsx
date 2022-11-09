import { useEffect, useState } from "react";
import "../sass/pages/Games.scss";

const Games = (props) => {
  const { games, setGames } = props;

  const [searchQuery, setSearchQuery] = useState("");

  const fetchGames = () => {
    fetch(`/games/getGames/?search=${searchQuery}`)
      .then(res => res.json())
      .then(res => setGames(res))
  };

  const keyHandler = e => {
    if (e.which === 13) {
      fetchGames();
    }
  }

  return (
    <>
      <div className="search-bar">
        <input className="game-input-field" placeholder="Search for games" onKeyPress={keyHandler} onChange={e => setSearchQuery(e.target.value)}></input>
        <button className="game-btn" onClick={fetchGames}>Search</button>
      </div>
      {games ? games.map(game => <h1 key={game.id}>{JSON.stringify(game)}</h1>) : null}
    </>
  )
}

export default Games;