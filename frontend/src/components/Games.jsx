import { useState, useEffect } from "react";
import "../sass/pages/Games.scss";
import GamePopup from "./GamePopup.jsx";


const Games = (props) => {
  const { 
    games,
    setGames,
    gamePopup,
    setGamePopup,
    selection,
    setSelection,
    user,
  } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [gameAlreadyAdded, setGameAlreadyAdded] = useState(null)

  useEffect(() => {
    setGames(null);
  }, [])

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
      <div className="games-title-container">
        <h1 className="games-title">Search Games</h1>
      </div>
      <div className="search-bar">
        <input 
          className="game-input-field" 
          placeholder="Search for games" 
          onKeyPress={keyHandler} 
          onChange={e => setSearchQuery(e.target.value)}
        ></input>
        <button className="game-btn" onClick={fetchGames}>Search</button>
      </div>
      {games ? games.map(game => <h2 onClick={async () => {
          setSelection(game);
          await fetch(`/games/checkIfAdded`, {
            method: "GET",
            headers: {
              selection: JSON.stringify(game.id),
              user: JSON.stringify(user)
            }
          }).then(res => res.json())
            .then(res => setGameAlreadyAdded(res))
          setGamePopup(true);
        }} className="game-container" key={game.id}>{JSON.stringify(game.name)}</h2>) : null}
      {gamePopup === true && <GamePopup 
                                gameAlreadyAdded={gameAlreadyAdded} 
                                setGameAlreadyAdded={setGameAlreadyAdded} 
                                user={user} selection={selection} 
                                setGamePopup={setGamePopup}
                              />}
      <div className="footer">~End of Results~</div>
    </>
  )
}

export default Games;