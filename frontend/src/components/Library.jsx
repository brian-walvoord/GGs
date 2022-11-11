import { useEffect, useState } from "react";
import "../sass/pages/Library.scss";
import LibraryPopup from "./LibraryPopup";

const Library = (props) => {
  const { library, setLibrary, user, selection, setLibraryPopup, libraryPopup, setSelection, rating, setRating } = props;

  useEffect(() => {
    fetch(`/games/getLibrary?id=${user[0].id}`)
      .then(res => res.json())
      .then(res => setLibrary(res))
  }, [])

  return (
    <>
      <div>
        {library ? library.map(game => <h2 onClick={() => {
          setLibraryPopup(true)
          setSelection(game)
        }} className="game-container" key={game.id}>{JSON.stringify(game.name_of_game)}</h2>) : <h1>No Games</h1>}
        {libraryPopup === true && <LibraryPopup rating={rating} setRating={setRating} user={user} selection={selection} setLibraryPopup={setLibraryPopup}/>}
      </div>
    </>
  )
}

export default Library;