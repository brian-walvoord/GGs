import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../sass/pages/Signup.scss";

const Signup = (props) => {
  const { setUserCreated } = props;

  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [secondPassword, setSecondPassword] = useState(null);

  const navigate = useNavigate();

  const signup = () => {
    if (password !== secondPassword) {
      console.log("nope, dumbass");
    } else {
      fetch(`/users/signup`, {
        method: 'POST',
        headers: {
          first_name: firstName,
          last_name: lastName,
          username: username,
          password: password,
        }
      })
      .then(res => res.json())
      .then(res => {
        setUserCreated(true);
        navigate("/")
      })
    }
  };

  return (
    <div className="user-select-container">
      <div className="pill-container signup-container">
        <h1 className="select-title">Create a GGs account</h1>
        <input onChange={e => setFirstName(e.target.value)} className="fn-input signup" placeholder="first name"></input>
        <input onChange={e => setLastName(e.target.value)} className="ln-input signup" placeholder="last name"></input>
        <input onChange={e => setUsername(e.target.value)} className="username-input signup" placeholder="username"></input>
        <input onChange={e => setPassword(e.target.value)} type="password" className="password-input signup" placeholder="password"></input>
        <input onChange={e => setSecondPassword(e.target.value)} type="password" className="password-input signup" placeholder="confirm password"></input>
        <button onClick={signup} className="btn-user">Sign up</button>
        <p className="signup-txt">To go back to the login page, <Link to="/">click here</Link></p>
      </div>
    </div>
  )
}

export default Signup;