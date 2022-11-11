import "../sass/layout/Header.scss";

const Header = (props) => {
  const { user } = props

  return (
    <div className="header-container">
      <h1 className="header-title">GGs</h1>
      <div className="header-user-container">
        <p className="header-user">User: {user ? user[0].first_name + " " + user[0].last_name : null}</p>
      </div>
    </div>
  )
}

export default Header;