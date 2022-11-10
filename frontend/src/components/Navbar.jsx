import { Link } from "react-router-dom";
import "../sass/layout/Navbar.scss";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <Link className="link" to="/home">Home</Link>
      <Link className="link" to="/games">Games</Link>
      <Link className="link" to="/users">My Library</Link>
      <Link className="link" to="/">Logout</Link>
    </nav>
  )
}

export default Navbar;