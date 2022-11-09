import { useEffect, useState } from "react";
import "../sass/pages/Users.scss";

const Games = (props) => {
  const { users, setUsers } = props;

  const fetchUsers = () => {
    fetch("/users/getUsers")
      .then(res => res.json())
      .then(res => setUsers(res))
  }

  return (
    <>
      <button onClick={fetchUsers}>Get Users</button>
      {users ? users.map(user => <h1 key={user.id}>{JSON.stringify(user)}</h1>) : null}
    </>
  )
}

export default Games;