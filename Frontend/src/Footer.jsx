import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import whatsapp from "./whatsapp.png";

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(-2, -8); // Scroll to the top whenever the location changes
  }, [location]);
  return (
    <>
      <footer className="text-center text-lg-start bg-light text-muted">
        {/* <section className="d-flex justify-content-center justify-content-lg-between  border-bottom"></section> */}
        <section
          className="pt-2"
          style={{ backgroundColor: "#a4a4ab", color: "black" }}
        >
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Vivaah.com
                </h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                  quam totam qui ipsam laboriosam, vitae maiores praesentium
                  inventore distinctio rem.
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <Link to="/" className="text-reset nav-link">
                    Home
                  </Link>
                </p>
                {/* <p>
            <Link to="/product" className="text-reset nav-link">Login</Link>
          </p> */}
                <p>
                  <Link to="/About" className="text-reset nav-link">
                    About
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="text-reset nav-link">
                    Contact
                  </Link>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i>{" "}
                  101,SindhuBhavan,Ahmedabad
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  abc123@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i>+9991234444
                </p>
                <p>
                  <i className="fas fa-print me-3"></i>+ 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center p-4" style={{ backgroundColor: "grey" }}>
          © 2023 Copyright:
          
            LJ University
          
        </div>
      </footer>
    </>
  );
};
export default Footer;
