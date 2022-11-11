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
    ratingChanged 
  } = props;

  const [cover, setCover] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [databaseRating, setDatabaseRating] = useState(null);


  const closePopup = () => {
    setLibraryPopup(false)
  }

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

  useEffect(() => {
    fetch(`/games/getRating/?id=${selection.id}`)
      .then(res => res.json())
      .then(res => setDatabaseRating(res[0].user_rating))
  }, [ratingChanged])

  useEffect(() => {
    fetch(`/games/getCover/?id=${selection.cover_of_game}`)
      .then(res => res.json())
      .then(res => {
        let coverArr = res[0].url.split("thumb");
        coverArr.splice(1, 0, "cover_big_2x");
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
              <select onChange={e => {
                  submitRating(e.target.value)
                  setRatingChanged(false)
                }} className="rating-dropdown">
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