import { useEffect, useState } from "react";
import "../sass/pages/Library.scss";
import LibraryPopup from "./LibraryPopup";

const Library = (props) => {
  const { 
    library, 
    setLibrary, 
    selection, 
    setLibraryPopup, 
    libraryPopup, 
    setSelection,
  } = props;

  const [gameDeleted, setGameDeleted] = useState(false);
  const [ratingChanged, setRatingChanged] = useState(false);
  const [graphicsRatingChanged, setGraphicsRatingChanged] = useState(false);
  const [soundRatingChanged, setSoundRatingChanged] = useState(false);
  const [gameplayRatingChanged, setGameplayRatingChanged] = useState(false);
  const [replayRatingChanged, setReplayRatingChanged] = useState(false);
  const [commentsChanged, setCommentsChanged] = useState(false);
  const [listChanged, setListChanged] = useState(false); // trigger, has individual game list been changed
  const [listSelect, setListSelect] = useState(null) // user selected list to view
  const [currentList, setCurrentList] = useState(null) // list of data

  useEffect(() => {
    fetch(`/games/getLibrary?id=${localStorage.getItem("id")}`)
      .then(res => res.json())
      .then(res => {
        setLibrary(res)
      })
  }, [gameDeleted, listChanged, listSelect])

  useEffect(() => {
    if (listSelect === "all") {
      setCurrentList(library);
    } else if (listSelect) {
      setCurrentList(library.filter(game => {
        if (game.list === listSelect) {
          return game;
        }
      }))
    }
  }, [listSelect])

  const renderList = () => {
    if (currentList) {
      return currentList.map(game => {
        return (
          <div key={game.id} className="game-container" onClick={() => {
            setLibraryPopup(true)
            setSelection(game)
            setGameDeleted(false)
          }}>
            <img className="thumbnail" src={game.cover_url} />
            <h2 className="game-title">{JSON.stringify(game.name_of_game)}</h2>
            <h3 className="list-preview">{game.list}</h3>
          </div>
        )
      })
    }
  }

  return (
    <>
      <div className="library-title-container">
        <h1 className="library-title">My Library</h1>
      </div>
        <div className="list-select-container">
          <label className="library-list-title">Select a list to view:</label>
          <select onChange={e => setListSelect(e.target.value)} className="library-list-dropdown">
            <option value="null"></option>
            <option value="all">all games</option>
            <option value="unassigned">unassigned</option>
            <option value="wishlist">wishlist</option>
            <option value="haven't started">haven't started</option>
            <option value="started">started</option>
            <option value="finished">finished</option>
          </select>
        </div>
        {library && renderList()}
        <div className="footer">~End of List~</div>
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
                                    listChanged={listChanged}
                                    setListChanged={setListChanged}
                                  />}
    </>
  )
}

export default Library;