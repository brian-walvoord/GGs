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
  const [graphicsRatingChanged, setGraphicsRatingChanged] = useState(false);
  const [soundRatingChanged, setSoundRatingChanged] = useState(false);
  const [gameplayRatingChanged, setGameplayRatingChanged] = useState(false);
  const [replayRatingChanged, setReplayRatingChanged] = useState(false);
  const [commentsChanged, setCommentsChanged] = useState(false);


  useEffect(() => {
    fetch(`/games/getLibrary?id=${user[0].id}`)
      .then(res => res.json())
      .then(res => setLibrary(res))
  }, [gameDeleted])

  return (
    <>
      <div className="library-title-container">
        <h1 className="library-title">My Library</h1>
      </div>
      <div className="library-container">
        {library ? library.map(game => <h2 onClick={() => {
          setLibraryPopup(true)
          setSelection(game)
          setGameDeleted(false)
        }} className="game-container" key={game.id}>{JSON.stringify(game.name_of_game)}</h2>) : null}
        {libraryPopup === true && <LibraryPopup 
                                    setRatingChanged={setRatingChanged} 
                                    ratingChanged={ratingChanged} 
                                    graphicsRatingChanged={graphicsRatingChanged}
                                    setGraphicsRatingChanged={setGraphicsRatingChanged}
                                    soundRatingChanged={soundRatingChanged}
                                    setSoundRatingChanged={setSoundRatingChanged}
                                    gameplayRatingChanged={gameplayRatingChanged}
                                    setGameplayRatingChanged={setGameplayRatingChanged}
                                    replayRatingChanged={replayRatingChanged}
                                    setReplayRatingChanged={setReplayRatingChanged}
                                    gameDeleted={gameDeleted} 
                                    setGameDeleted={setGameDeleted} 
                                    selection={selection} 
                                    setLibraryPopup={setLibraryPopup}
                                    commentsChanged={commentsChanged}
                                    setCommentsChanged={setCommentsChanged}
                                  />}
      </div>
    </>
  )
}

export default Library;