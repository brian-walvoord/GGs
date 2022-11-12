import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../sass/pages/UserSelect.scss";

const UserSelect = (props) => {
  const { setSelectedUser } = props

  useEffect(() => {
    setSelectedUser("1")
  }, [])

  return (
    <div className="user-select-container">
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
    </div>
  );
}

export default UserSelect;