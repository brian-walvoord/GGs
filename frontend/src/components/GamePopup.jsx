import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/layout/Popup.scss";

const GamePopup = (props) => {
  const { setGamePopup, selection } = props;

  const [cover, setCover] = useState(null)

  const closePopup = () => {
    setGamePopup(false)
  }

  useEffect(() => {
    fetch(`/games/getCover/?id=${selection.cover}`)
      .then(res => res.json())
      .then(res => {
        let coverArr = res[0].url.split("thumb");
        coverArr.splice(1, 0, "cover_big");
        return coverArr.join("");
      })
      .then(res => setCover(res))
  }, [])

  return (
    <Modal size="lg" show={true} onHide={closePopup}>
      <Card className="popup-container">
      <CloseButton className="closeBtn" onClick={closePopup}/>
      <Card.Img className="game-cover" alt="game cover" src={cover}></Card.Img>
        <Card.Body>
          <div className="title">
            <h1>{selection.name}</h1>
            <h3>rating will go here</h3>
          </div>
          <h2>{selection.summary}</h2>
        </Card.Body>
      </Card>
    </Modal>
  )
}

export default GamePopup;