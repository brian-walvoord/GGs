import { Link } from "react-router-dom";
import "../sass/pages/Signup.scss";

const Signup = () => {
  return (
    <div>
      <h1>This is the signup page</h1>
      <Link to="/">Go back to Login</Link>
    </div>
  )
}

export default Signup;