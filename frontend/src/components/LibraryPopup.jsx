import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/layout/Popup.scss";

const LibraryPopup = (props) => {
  const { 
    setLibraryPopup, 
    selection, 
    gameDeleted, 
    setGameDeleted, 
    setRatingChanged,
    ratingChanged,
    graphicsRatingChanged,
    setGraphicsRatingChanged,
    soundRatingChanged,
    setSoundRatingChanged,
    gameplayRatingChanged,
    setGameplayRatingChanged,
    replayRatingChanged,
    setReplayRatingChanged,
    commentsChanged,
    setCommentsChanged,
  } = props;

  const [cover, setCover] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [databaseRating, setDatabaseRating] = useState(null);

  //##########################
  const [databaseGraphicsRating, setDatabaseGraphicsRating] = useState(null);
  const [databaseSoundRating, setDatabaseSoundRating] = useState(null);
  const [databaseGameplayRating, setDatabaseGameplayRating] = useState(null);
  const [databaseReplayRating, setDatabaseReplayRating] = useState(null);
  const [databaseComments, setDatabaseComments] = useState(null);
  //##########################

  const [moreOptions, setMoreOptions] = useState(false);


  const closePopup = () => {
    setLibraryPopup(false)
  }

  // rating submits
  const submitRating = async (userRating) => {
    let result = await fetch(`/games/addRating?rating=${userRating}`, {
      method: "PUT",
      headers: {
        id: JSON.stringify(selection.id)
      }
    })
    if (result.status === 200) {
      setRatingChanged(true);
    }
  }

  //#################################################################
  // graphics rating submit
  const submitGraphicsRating = async (userRating) => {
    let result = await fetch(`/games/addGraphicsRating?rating=${userRating}`, {
      method: "PUT",
      headers: {
        id: JSON.stringify(selection.id)
      }
    })
    if (result.status === 200) {
      setGraphicsRatingChanged(true);
    }
  }

  // sound_and_music rating submit
  const submitSoundRating = async (userRating) => {
    let result = await fetch(`/games/addSoundRating?rating=${userRating}`, {
      method: "PUT",
      headers: {
        id: JSON.stringify(selection.id)
      }
    })
    if (result.status === 200) {
      setSoundRatingChanged(true);
    }
  }

  // gameplay rating submit
  const submitGameplayRating = async (userRating) => {
    let result = await fetch(`/games/addGameplayRating?rating=${userRating}`, {
      method: "PUT",
      headers: {
        id: JSON.stringify(selection.id)
      }
    })
    if (result.status === 200) {
      setGameplayRatingChanged(true);
    }
  }

  // replayability rating submit
  const submitReplayRating = async (userRating) => {
    let result = await fetch(`/games/addReplayRating?rating=${userRating}`, {
      method: "PUT",
      headers: {
        id: JSON.stringify(selection.id)
      }
    })
    if (result.status === 200) {
      setReplayRatingChanged(true);
    }
  }

  // comments submit
  const submitComments = async (comments) => {
    let result = await fetch(`/games/addComments`, {
      method: "PUT",
      headers: {
        id: JSON.stringify(selection.id),
        comments: comments,
      }
    })
    if (result.status === 200) {
      setCommentsChanged(true);
    }
  }
  //##########################################################


  useEffect(() => {
    fetch(`/games/getRating/?id=${selection.id}`)
      .then(res => res.json())
      .then(res => setDatabaseRating(res[0].user_rating))
  }, [ratingChanged])

  //#########################################################
  useEffect(() => {
    fetch(`/games/getGraphicsRating/?id=${selection.id}`)
      .then(res => res.json())
      .then(res => setDatabaseGraphicsRating(res[0].graphics))
  }, [graphicsRatingChanged])

  useEffect(() => {
    fetch(`/games/getSoundRating/?id=${selection.id}`)
      .then(res => res.json())
      .then(res => setDatabaseSoundRating(res[0].sound_and_music))
  }, [soundRatingChanged])

  useEffect(() => {
    fetch(`/games/getGameplayRating/?id=${selection.id}`)
      .then(res => res.json())
      .then(res => setDatabaseGameplayRating(res[0].gameplay))
  }, [gameplayRatingChanged])

  useEffect(() => {
    fetch(`/games/getReplayRating/?id=${selection.id}`)
      .then(res => res.json())
      .then(res => setDatabaseReplayRating(res[0].replayability))
  }, [replayRatingChanged])

  useEffect(() => {
    fetch(`/games/getComments?id=${selection.id}`)
      .then(res => res.json())
      .then(res => setDatabaseComments(res[0].user_comments))
  }, [commentsChanged])
  //#########################################################

  useEffect(() => {
    fetch(`/games/getCover/?id=${selection.cover_of_game}`)
      .then(res => res.json())
      .then(res => {
        let coverArr = res[0].url.split("thumb");
        coverArr.splice(1, 0, "cover_big");
        return coverArr.join("");
      })
      .then(res => setCover(res))
  }, [])

  const removeGame = async () => {
    let result = await fetch(`/games/removeGame/?id=${selection.id}`, {
      method: "DELETE"
    })
    if (result.status === 200) {
      setGameDeleted(true);
    }
  };

  const makeTenRatings = (onChangeFunc) => {
    return (
      <select onChange={onChangeFunc} className="rating-dropdown">
        <option value="null"></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    )
  }

  return (
    <Modal size="lg" show={true} onHide={closePopup}>
      <Card className="popup-container">
        <CloseButton className="closeBtn" onClick={closePopup}/>
        <div className="image-container">
          {loaded ? null : (
            <div className="load-container">
              <Spinner animation="border" role="status"></Spinner>
            </div>
          )}
            <Card.Img
              className="game-cover"
              style={loaded ? {} : { display: 'none' }}
              src={cover}
              onLoad={() => setLoaded(true)}
            ></Card.Img>
        </div>
        <Card.Body>
          <div className="title">
            <h1 className="name">{selection.name_of_game}</h1>
            <div className="rating-container">
              {databaseRating ? <h2>Your Rating: <span className="rating-score">{databaseRating}/10</span></h2> : <h2>Your Rating: <i>not yet rated</i></h2>}
              <label className="rating-title">Change Rating:</label>
              {makeTenRatings(e => {
                  submitRating(e.target.value)
                  setRatingChanged(false)
                })}
              <button onClick={() => setMoreOptions(true)}>more options</button>
              {moreOptions && 
                <div className="more-options-container">
                  {databaseGraphicsRating ? <h2>Your Graphics Rating: <span className="rating-score">{databaseGraphicsRating}/10</span></h2> : <h2>Your Graphics Rating: <i>not yet rated</i></h2>}
                  <label className="rating-title">Graphics:</label>
                  {makeTenRatings(e => {
                    submitGraphicsRating(e.target.value)
                    setGraphicsRatingChanged(false)
                  })}
                  {databaseSoundRating ? <h2>Your Sound/Music Rating: <span className="rating-score">{databaseSoundRating}/10</span></h2> : <h2>Your Sound/Music Rating: <i>not yet rated</i></h2>}
                  <label className="rating-title">Sound/Music:</label>
                  {makeTenRatings(e => {
                    submitSoundRating(e.target.value)
                    setSoundRatingChanged(false)
                  })}
                  {databaseGameplayRating ? <h2>Your Gameplay Rating: <span className="rating-score">{databaseGameplayRating}/10</span></h2> : <h2>Your Gameplay Rating: <i>not yet rated</i></h2>}
                  <label className="rating-title">Gameplay:</label>
                  {makeTenRatings(e => {
                    submitGameplayRating(e.target.value)
                    setGameplayRatingChanged(false)
                  })}
                  {databaseReplayRating ? <h2>Your Replayability Rating: <span className="rating-score">{databaseReplayRating}/10</span></h2> : <h2>Your Replayability Rating: <i>not yet rated</i></h2>}
                  <label className="rating-title">Replayability:</label>
                  {makeTenRatings(e => {
                    submitReplayRating(e.target.value)
                    setReplayRatingChanged(false)
                  })}
                  <div className="user-comments-container">
                    <label className="rating-title">Comments:</label>
                    <textarea onChange={e => {
                      submitComments(e.target.value)
                      setCommentsChanged(false);
                    }} className="user-comments" placeholder="add comments here">{databaseComments}</textarea>
                  </div>
                </div>
              }
            </div>
          </div>
          <h2>{selection.description_of_game}</h2>
          {gameDeleted ? <h2>Game Deleted!</h2> : <Button onClick={removeGame} className="remove-btn" variant="danger">Remove from Library</Button>}
        </Card.Body>
      </Card>
    </Modal>
  )
}

export default LibraryPopup;