import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../sass/pages/Homepage.scss";

const Homepage = (props) => {
  const { 
    selectedUser,
    setUser,
    user
  } = props;

  // use this to fetch full name from database with the selectedUser number === id
  useEffect(() => {
    fetch(`/users/getFullName?id=${selectedUser}`)
      .then(res => res.json())
      .then(res => setUser(res))
  }, [])

  return (
    <div className="welcome-container">
      <h1 className="welcome-txt">Welcome back, {user ? user[0].first_name + " " + user[0].last_name : null}!</h1>
      <div className="welcome-btn-container">
        <Link to="/library" style={{textDecoration: 'none'}}><div className="welcome-btn">
          <h1 className="welcome-btn-txt">My Library</h1>
        </div></Link>
        <Link to="/games" style={{textDecoration: 'none'}}><div className="welcome-btn">
          <h1 className="welcome-btn-txt">Search Games</h1>
        </div></Link>
      </div>
    </div>
  )
}

export default Homepage;