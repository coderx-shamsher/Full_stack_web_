
import { Link } from "react-router";
import "./HomeNavbar.css";

const HomeNavbar = () => {
  return (
    <>
      <header className="navbar-header">
        <div className="logo">Rest-Apis</div>
        <ul className="navlinks">
          <li>
            <Link className="Link" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="Link" to={"/get-users"}>
              GetUsers
            </Link>
          </li>
          <li>
            <Link className="Link" to={"/create-user"}>
              CreateUsers
            </Link>
          </li>
          <li>
            <Link className="Link" to={"/remove-user"}>
              RemoveUser
            </Link>
          </li>
          <li>
            <Link className="Link" to={"/update-user"}>
              UpdateUser
            </Link>
          </li>
            <li>
            <Link className="Link" to={"/about"}>
              About
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default HomeNavbar;
