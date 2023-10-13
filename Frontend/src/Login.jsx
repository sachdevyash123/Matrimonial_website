import React from "react";
import { Link } from "react-router-dom";
import background from "./login.jpg";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
const Login = () => {
  const myStyle = {
    backgroundImage: `url(${background})`,
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const [login, setLogin] = useState({});
  const [cookies, setCookie] = useCookies(["access", "refresh"]);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/token/", login)
      .then((res) => {
        console.log(res);
        if (res.data.access && res.data.refresh) {
          toast.success("Login Successfull");
          setCookie("access", res.data.access);
          setCookie("refresh", res.data.refresh);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div class="vh-100 d-flex justify-content-center align-items-center mt-2">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
              <div class="card " style={myStyle}>
                <div class="card-body p-5">
                  <form class="mb-3 mt-md-4" onSubmit={handleLoginSubmit}>
                    <h2 class="fw-bold mb-2 text-uppercase text-center ">
                      Login Now!
                    </h2>

                    <div class="mb-3">
                      <label for="email" class="form-label fs-5 ">
                        Email address
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        onChange={handleLoginChange}
                        placeholder="name@example.com"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label fs-5">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        onChange={handleLoginChange}
                        placeholder="*******"
                      />
                    </div>

                    <div
                      className="d-grid"
                      style={{ justifyContent: "center" }}
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        style={{ width: "100px" }}
                      >
                        Login
                      </Button>
                    </div>
                  </form>
                  <div className="row">
                    <h2 class="mb-0  text-center col-md-8 fs-3">
                      Don't have an account?
                    </h2>
                    <div className=" col-md-3">
                      <Link to="/Signup">
                        <Button
                          content="contained"
                          style={{ backgroundColor: "lightblue" }}
                        >
                          Register
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
