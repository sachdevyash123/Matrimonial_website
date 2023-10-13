import React, { useRef, useEffect } from "react";
// import Img from "./img1.jpg"
// import Img from "./img2.jpg"
import Img from "./img5.jpg";
import img6 from "./img6.jpg";

const Image = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Autoplay the video when the component mounts
    videoRef.current.play();
  }, []);
  return (
    <>
      <div className=" container-fluid video__var">
        <div className="row justify-content-center">
          <div className="col mt-5">
            <div className="embed-responsive embed-responsive-16by9 d-flex justify-content-center align-items-center">
              <div className=" intro__title d-flex justify-content-center align-items-center fw-bold">
                Best Vivah Site
              </div>
              <video
                ref={videoRef}
                className="embed-responsive-item embed-responsive-16by9 video__var"
                width="100%"
                muted
                // style={{ maxWidth: "100%" }}
              >
                <source src="./video21.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container-fluid " style={{marginTop:"70px"}}>
        <div className="row  ">
          <div className="col-md-12">
            <div className="embed-responsive embed-responsive">
              <iframe
                title="Responsive Video"
                className="embed-responsive-item"
                width="100%"
                height="700px"
                src="https://www.youtube.com/embed/q8zN2hqerrU?mute=1&autoplay=1&controls=0&disablekb=1"
                Muted
              ></iframe>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="row mt-5 opacity-4">
        <img class="img-responsive col-12" src={img6} alt="Chania" height="550px"></img>
        </div> */}
    </>
  );
};
export default Image;
