import { useEffect, useState } from "react";
import "../sass/pages/Library.scss";
import LibraryPopup from "./LibraryPopup";

const Library = (props) => {
  const { 
    library, 
    setLibrary, 
    user, 
    selection, 
    setLibraryPopup, 
    libraryPopup, 
    setSelection 
  } = props;

  const [gameDeleted, setGameDeleted] = useState(false);
  const [ratingChanged, setRatingChanged] = useState(false);


  useEffect(() => {
    fetch(`/games/getLibrary?id=${user[0].id}`)
      .then(res => res.json())
      .then(res => setLibrary(res))
  }, [gameDeleted])

  return (
    <>
      <div>
        {library ? library.map(game => <h2 onClick={() => {
          setLibraryPopup(true)
          setSelection(game)
          setGameDeleted(false)
        }} className="game-container" key={game.id}>{JSON.stringify(game.name_of_game)}</h2>) : <h1>No Games</h1>}
        {libraryPopup === true && <LibraryPopup 
                                    setRatingChanged={setRatingChanged} 
                                    ratingChanged={ratingChanged} 
                                    gameDeleted={gameDeleted} 
                                    setGameDeleted={setGameDeleted} 
                                    selection={selection} 
                                    setLibraryPopup={setLibraryPopup}
                                  />}
      </div>
    </>
  )
}

export default Library;