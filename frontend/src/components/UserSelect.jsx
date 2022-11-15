import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../sass/pages/UserSelect.scss";

const UserSelect = (props) => {
  const { setSelectedUser } = props

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch(`/users/auth?username=${username}&password=${password}`)
      .then(res => res.status === 404 ? console.log("Nope") : navigate("/home"))
      // .then(res => setSelectedUser(res))
  }

  return (
    <>
      {/* <div className="user-select-container">
        <div className="pill-container">
          <h1 className="select-title">Please select a user:</h1>
          <select name="users" className="user-select" onChange={e => setSelectedUser(e.target.value)}>
            <option value="1">🪁 Franklin</option>
            <option value="2">🎩 Abraham</option>
            <option value="3">🕶 Barack</option>
            <option value="4">🪓 George</option>
            <option value="5">🖋 Thomas</option>
          </select>
          <Link className="btn-txt" to="/home"><button className="btn-user">Login</button></Link>
        </div>
      </div> */}
      <div className="user-select-container">
        <div className="pill-container">
          <h1 className="select-title">Please sign in:</h1>
          <input onChange={e => setUsername(e.target.value)} className="usernameLogin" placeholder="username"></input>
          <input onChange={e => setPassword(e.target.value)} type="password" className="passwordLogin" placeholder="password"></input>
          <button onClick={handleLogin} className="btn-user">Login</button>
          <p className="signup-txt">New to GGs? Click <Link to="/signup">sign up</Link> to make an account</p>
        </div>
      </div>
    </>
  );
}

export default UserSelect;