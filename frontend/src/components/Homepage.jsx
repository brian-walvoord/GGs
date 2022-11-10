import { useEffect } from "react";
import "../sass/pages/Homepage.scss";

const Homepage = (props) => {
  const { selectedUser } = props;

  useEffect(() => {
    console.log(`selected user: ${selectedUser}`)
  })

  return (
    <>
      <h1>This is the homepage</h1>
    </>
  )
}

export default Homepage;