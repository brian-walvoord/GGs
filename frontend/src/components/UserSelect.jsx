import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../sass/pages/UserSelect.scss";

const UserSelect = (props) => {
  const { usersFName, setUsersFName, setSelectedUser } = props

  useEffect(() => {
    setSelectedUser("1")
  }, [])

  // useEffect(() => {
  //   fetch("/users/getUsers")
  //     .then(res => res.json())
  //     .then(res => {
  //       setUsersFName(res.map(user => {
  //         return user.first_name
  //       }))
  //     })
  // }, []);

  return (
    <div className="user-select-container">
      <h1>Please select a user:</h1>
      {usersFName ? usersFName.map(fname => <h3 className="DELETE" key={usersFName.indexOf(fname)}>{fname}</h3>) : <h3>none</h3>}
      <select name="users" className="user-select" onChange={e => setSelectedUser(e.target.value)}>
        <option value="1">🪁 Franklin</option>
        <option value="2">🎩 Abraham</option>
        <option value="3">🕶 Barack</option>
        <option value="4">🪓 George</option>
        <option value="5">🖋 Thomas</option>
      </select>
      <Link className="btn-txt" to="/home"><button className="btn-user">Login</button></Link>
    </div>
  );
}

export default UserSelect;