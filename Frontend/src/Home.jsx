import Image from "./Image";
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import background from "./bg4.jpg";
import cbackground from "./bg8.jpg";
import Img1 from "./i1.jpg";
import Img2 from "./i2.jpg";
import Img3 from "./i3.jpg";
import Button from "@mui/material/Button";
import { useAuth } from "./AuthContext";
const Home = () => {
  const style1 = {
    backgroundImage: `url(${background})`,
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const style2 = {
    backgroundImage: `url(${cbackground})`,
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Image />
      <section className="light-bg success-section mt-3 section mb-3">
        <div className="container-fluid p-5 mt-4 mb-4  ">
          <div className="row">
            <div className="col-xs-12 ">
              <h1 className="text-uppercase page-title text-center fs-2 title__text">
                Success Stories
              </h1>
              <div className="row success-text-wrapper">
                <div className="col-md-12 col-sm-12 mt-2">
                  <div
                    className="text-center normal__text"
                    style={{ fontSize: "20px" }}
                  >
                    India's Most Preferred and Trusted Service for Finding a
                    Life-Partner. Most Trusted Matchmaking Service with Millions
                    of Success Stories. Matches from your City. Most Trusted
                    Brand.100% Privacy.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-5">
            <div className="container mt-5">
              <div className="row box-container">
                <div className="col-lg-4 col-md-4 mb-4">
                  <div className="d-flex flex-column h-100 box" style={style1}>
                    <div className="box-number fs-2">155</div>
                    <div className="box-text text-center fs-5">
                      New Profiles in last 30 Days
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-5 mb-4">
                  <div className="d-flex flex-column h-100 box" style={style1}>
                    <div className="box-number fs-2">498</div>
                    <div className="box-text text-center fs-5">
                      Got engaged through us
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="d-flex flex-column h-100 box" style={style1}>
                    <div className="box-number fs-2">500</div>
                    <div className="box-text text-center fs-5">
                      Active Profiles
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1
          className="text-center title__text p-4"
          style={{ color: "#3498db" }}
        >
          Inspiring Love Stories
        </h1>
        <div className="container mb-5 h-100">
          <div className="row container-fluid">
            <div className="col-md-4 col-lg-4 col-sm-6 ">
              <div className="card cards">
                <img
                  className="card-img-top img-fluid"
                  src={Img1}
                  alt="Card"
                  style={{ maxHeight: "350px", height: "350px" }}
                />
                <div className="card-body">
                  <h4 className="card-title">Siddharth & Kiara</h4>
                  <p className="card-text">
                    Contact genuine profiles with 100% verified mobile numbers
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-6">
              <div className="card cards">
                <img
                  className="card-img-top img-fluid"
                  src={Img2}
                  alt="Card "
                  style={{ maxHeight: "350px", height: "350px" }}
                />
                <div className="card-body">
                  <h4 className="card-title">Varun & Natasha</h4>
                  <p className="card-text">
                    The most trusted matrimony brand - The Brand Trust Report
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-6">
              <div className="card cards">
                <img
                  className="card-img-top img-fluid"
                  src={Img3}
                  alt="Card "
                  style={{ maxHeight: "350px", height: "350px" }}
                />
                <div className="card-body">
                  <h4 className="card-title">Virat & Anushka</h4>
                  <p className="card-text">
                    Highest number of documented marriages online so check it
                    now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid mt-2 section">
        <h1 className="fs-2 text-center">Membership Plans</h1>
        <div className="d-flex align-items-center justify-content-evenly mt-5 premium mb-5">
          {!isLoggedIn && (
            <>
              {" "}
              <div>
                <div className="card" id="plans" style={style2}>
                  <div className="card-body">
                    <h5 className="card-title text-center">Free</h5>
                    <p className="card-text">
                      ✔ <del>₹3000</del> Free Membership
                    </p>
                    <p>✔ Send Customized interests</p>
                    <p>✖ See Contact Phone Nos</p>
                    <p>✖ Priority Customer Support</p>
                    <p>✖ Chat with Unlimited Users</p>
                    <div
                      style={{ justifyContent: "center" }}
                      className="d-grid"
                    >
                      <Link to="/Signup">
                        <Button variant="contained" style={{ width: "150px" }}>
                          Register Free
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div>
            <div className="card" id="plans" style={style2}>
              <div className="card-body">
                <h5 className="card-title text-center">Paid</h5>
                <p className="card-text">✔ ₹6000 Membership Per Month</p>
                <p>✔ Send Customized interests</p>
                <p>✔ See Contact Phone Nos</p>
                <p>✔ Priority Customer Support</p>
                <p>✔ Chat with Unlimited Users</p>
                <div style={{ justifyContent: "center" }} className="d-grid">
                  <Link to="/">
                    <Button
                      variant="contained"
                      className="mb-2 mt-2"
                      style={{ width: "150px" }}
                    >
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="container-fluid my-5">
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <div className="row">
                    <div className="col">
                        <img src={img1} alt="" />
                    </div>
                    <div className="col">
                        <img src={img1} className="img-fluid" alt="Image 2"/>
                    </div>
                    <div className="col">
                        <img src={img1} className="img-fluid" alt="Image 3"/>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row">
                    <div className="col">
                        <img src={img1} className="img-fluid" alt="Image 4"/>
                    </div>
                    <div className="col">
                        <img src={img1} className="img-fluid" alt="Image 5"/>
                    </div>
                    <div className="col">
                        <img src={img1} className="img-fluid" alt="Image 6"/>
                    </div>
                </div>
            </div>
        </div>

        <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#myCarousel" data-slide="next">
            <span className="carousel-control-next-icon"></span>
        </a>
    </div>
</div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
