import { useEffect, useState } from "react";
import "../sass/pages/Games.scss";
import GamePopup from "./GamePopup.jsx";


const Games = (props) => {
  const { 
    games, 
    setGames, 
    gamePopup, 
    setGamePopup, 
    selection, 
    setSelection 
  } = props;

  const [searchQuery, setSearchQuery] = useState("");
  // const [gamePopup, setGamePopup] = useState(false);

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
      {games ? games.map(game => <h2 onClick={() => {
          setGamePopup(true);
          setSelection(game);
        }} className="game-container" key={game.id}>{JSON.stringify(game.name)}</h2>) : null}
      {gamePopup === true && <GamePopup selection={selection} setGamePopup={setGamePopup}/>}
      <div className="footer">~End of Results~</div>
    </>
  )
}

export default Games;