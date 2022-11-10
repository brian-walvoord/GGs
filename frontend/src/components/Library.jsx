import { useEffect, useState } from "react";
import "../sass/pages/Users.scss";

const Games = (props) => {
  const { library, setLibrary, user } = props;

  useEffect(() => {
    fetch(`/games/getLibrary?id=${user[0].id}`)
      .then(res => res.json())
      .then(res => setLibrary(res))
  }, [])

  return (
    <>
      <div>
        {library ? library.map(game => <h2 className="game-container" key={game.id}>{JSON.stringify(game.name_of_game)}</h2>) : <h1>No Games</h1>}
      </div>
    </>
  )
}

export default Games;