import "../sass/layout/Header.scss";
import { useEffect } from "react";

const Header = (props) => {
  const { setUser, user } = props

  useEffect(() => {
    if (localStorage.getItem("id")) {
      fetch(`/users/getFullName?id=${localStorage.getItem("id")}`)
        .then(res => res.json())
        .then(res => setUser(res))
    }
  }, [])

  return (
    <div className="header-container">
      <h1 className="header-title">GGs</h1>
      <div className="header-user-container">
        {user ? <p className="header-user">User: {user[0].first_name + " " + user[0].last_name}</p> : null}
      </div>
    </div>
  )
}

export default Header;