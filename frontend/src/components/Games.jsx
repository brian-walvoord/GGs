import { useEffect, useState } from "react";
import "../sass/pages/Games.scss";

const Games = (props) => {
  const { games, setGames } = props;

  const [searchQuery, setSearchQuery] = useState("ghost of tsushima");

  const fetchGames = () => {
    fetch(`/games/getGames/?search=${searchQuery}`)
      .then(res => res.json())
      .then(res => setGames(res))
  };

  return (
    <>
      <button onClick={fetchGames}>Get Games</button>
      {games ? games.map(game => <h1 key={game.id}>{JSON.stringify(game)}</h1>) : null}
    </>
  )
}

export default Games;