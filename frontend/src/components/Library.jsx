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
      {library ? library.map(game => <h1 key={game.id}>{JSON.stringify(game)}</h1>) : <h1>No Games</h1>}
    </>
  )
}

export default Games;