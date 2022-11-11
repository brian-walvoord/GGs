import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/layout/Popup.scss";

const GamePopup = (props) => {
  const { setGamePopup, selection, user } = props;

  const [cover, setCover] = useState(null)
  const [loaded, setLoaded] = useState(false);
  const [gameAdded, setGameAdded] = useState(false);


  const closePopup = () => {
    setGamePopup(false)
  }

  useEffect(() => {
    fetch(`/games/getCover/?id=${selection.cover}`)
      .then(res => res.json())
      .then(res => {
        let coverArr = res[0].url.split("thumb");
        coverArr.splice(1, 0, "cover_big_2x");
        return coverArr.join("");
      })
      .then(res => setCover(res))
  }, [])

  const addToLibrary = async () => {
    let selectionStr = JSON.stringify(selection);
    let fixedStr = selectionStr.split("’").join("'");
    let secondFixedStr = fixedStr.split("–").join("-");
    let result = await fetch(`/games/addGame`, {
      method: "POST",
      headers: {
        'user': JSON.stringify(user),
        'selection': secondFixedStr
      },
    })
    if (result.status === 200) {
      setGameAdded(true)
    };
  };

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
            <h1 className="name">{selection.name}</h1>
            {gameAdded ? <h2>Game added!</h2> : <button className="add-btn" onClick={addToLibrary}>Add to library</button>}
          </div>
          <h2>{selection.summary}</h2>
        </Card.Body>
      </Card>
    </Modal>
  )
}

export default GamePopup;