import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../sass/pages/UserSelect.scss";

const UserSelect = (props) => {
  const { setSelectedUser, userCreated } = props

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(true);

  const handleLogin = () => {
    fetch(`/users/auth?username=${username}&password=${password}`)
      .then(res => res.json())
      .then(res => (typeof res === "string") ? setAuth(false) : handleAuthSuccess(res))
  }

  const handleAuthSuccess = (res) => {
    setSelectedUser(JSON.stringify(res[0].id));
    navigate("/home")
  }

  return (
    <>
      <div className="user-select-container">
        <div className="pill-container">
          <h1 className="select-title">Please sign in:</h1>
          <input onChange={e => setUsername(e.target.value)} className="usernameLogin" placeholder="username"></input>
          <input onChange={e => setPassword(e.target.value)} type="password" className="passwordLogin" placeholder="password"></input>
          <button onClick={handleLogin} className="btn-user">Login</button>
          {!auth && <h3 className="auth-fail">incorrect username or password</h3>}
          {userCreated && <h3 className="signup-success">User created! Please login</h3>}
          <p className="signup-txt">New to GGs? Click <Link to="/signup">sign up</Link> to make an account</p>
        </div>
      </div>
    </>
  );
}

export default UserSelect;