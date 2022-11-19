import { Link } from "react-router-dom";
import "../sass/layout/Navbar.scss";

const Navbar = (props) => {
  const { setUser } = props;

  const logout = () => {
    setUser("")
    localStorage.removeItem("id")
  }

  return (
    <nav className="navbar">
      <Link className="link" to="/home">Home</Link>
      <Link className="link" to="/library">My Library</Link>
      <Link className="link" to="/games">Games</Link>
      <Link onClick={logout} className="link" to="/">Logout</Link>
    </nav>
  )
}

export default Navbar;