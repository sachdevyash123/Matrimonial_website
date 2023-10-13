import { Link } from "react-router-dom";

import "./Nstyle.css";
import Button from "@mui/material/Button";
// import Logo from "./logo1.jpg";
import Logo1 from "./logo5.png";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [cookies, setCookie] = useCookies(["access", "refresh"]);
  const handleLogout = () => {
    axios
      .post("http://localhost:8000/api/user/logout/", {
        refresh_token: cookies.refresh,
      })
      .then((res) => {
        const expirationDate = new Date(); // Create a new Date object
        expirationDate.setDate(expirationDate.getDate() - 1);
        setIsLoggedIn(false);

        setCookie("access", "", { expires: expirationDate });
        setCookie("refresh", "", { expires: expirationDate });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <nav
        id="navbar"
        className="navbar navbar-expand-sm fixed-top primary__font"
        style={{ backgroundColor: "#F3E8D6", color: "black" }}
      >
        <div class="container-fluid">
          <div>
            <Link
              to="/"
              className="nav-link"
              style={{
                fontSize: "30px",
                // fontFamily: 'Fredericka the Great',
                fontFamily: "Tourney",
                fontVariant: "petite-caps",
              }}
            >
              <img
                src={Logo1}
                alt="Avatar Logo"
                style={{ width: "180px" }}
                className="navbar-logo"
              />
            </Link>
          </div>
          <button
            id="openButton"
            className="navbar-toggler ml-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-info"
            id="collapsibleNavbar"
          >
            <ul className="navbar-nav me-auto p-1">
              <li className="nav-item">
                <Link className="nav-link  fs-5" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  fs-5" to="/About">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  fs-5" to="/Plist">
                  All Profiles
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  fs-5" to="/Contact">
                  ContactUs
                </Link>
              </li>
            </ul>
            {isLoggedIn ? (
              <>
                {" "}
                <Link className="nav-link login fs-5" to="/Dashboard">
                  <Button
                    variant="contained"
                    className="mx-1 mb-1 btn__primary"
                    // style={{ width: "30px", backgroundColor: "#C41E4A" }}
                  >
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  className="mx-1 mb-1 btn__primary"
                  color="info"
                  // style={{ width: "30px" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Link className="nav-link login " to="/Login">
                  <Button
                    variant="contained"
                    className="mx-1 mb-1 btn__primary"
                    color="info"
                    // style={{ width: "30px" }}
                  >
                    Login
                  </Button>
                </Link>
                <Link className="nav-link login " to="/Signup">
                  <Button
                    variant="contained"
                    className="mx-1 mb-1 btn__primary"
                    color="info"
                    // style={{ width: "30px" }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
