import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../sass/pages/UserSelect.scss";

const UserSelect = (props) => {
  const { usersFName, setUsersFName } = props

  useEffect(() => {
    fetch("/users/getUsers")
      .then(res => res.json())
      .then(res => {
        setUsersFName(res.map(user => {
          return user.first_name
        }))
      })
  }, []);

  return (
    <div>
      <h1>Please select a user:</h1>
      {usersFName ? usersFName.map(fname => <h3 key={usersFName.indexOf(fname)}>{fname}</h3>) : <h3>none</h3>}
      <button className="btn-user"><Link className="btn-txt" to="/home">No...</Link></button>
    </div>
  );
}

export default UserSelect;