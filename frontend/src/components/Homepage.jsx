import { useEffect } from "react";
import "../sass/pages/Homepage.scss";

const Homepage = (props) => {
  const { 
    selectedUser, 
    setUser, 
    user 
  } = props;

  // use this to fetch full name from database with the selectedUser number === id
  // useEffect(() => {
  //   fetch(`/users/getFullName?id=${selectedUser}`)
  //     .then(res => res.json())
  //     .then(res => setUser(res))
  // }, [])

  return (
    <>
      {/* <h1>Hello, {user ? user[0].first_name + " " + user[0].last_name : null}</h1> */}
      <h1>This is the homepage</h1>
    </>
  )
}

export default Homepage;