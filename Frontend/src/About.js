import React from "react";
import Img1 from "./ganesha.png";
const About = () => {
  return (
    <div class="row justify-content-center mt-5">
      <div className="col-sm-10 col-sm-offset-1 col-xs-12 about-wrapper p-3 fs-4">
        <div className="col-md-4 p-r-none text-center mx-auto ">
          <img
            src={Img1}
            className="about-block-img img-responsive img-fluid" height="30px"
          />
        </div>
        <div className="col-md-8 custom-pad container text-wrap ">
          <h4 className="text-uppercase page-title text-center pt-3 ">
            <strong>About US</strong>
          </h4>
          <p className="page-text fs-5 text-left text-justify">
            Swayamwar marriage and counseling bureau came into existence (around
            1992) as a result of strong desire to do social activity keeping in
            mind the lack of societal contacts. It is promoted by Smt.
            Dharmistaben Kirtikantbhai Nanavati.
          </p>
          <p className="page-text fs-5 text-left text-justify">
            She is always eager to help people and gets indulged in various
            social activities. She is also associated with various social
            organizations like, Lion International, Sarvar Mandal and so on. She
            also organizes free legal aid for matrimonial disputes.
          </p>
          <p className="page-text fs-5 text-left text-justify">
            The funds earned by Swayamwar marriage and counseling bureau is used
            for charitable purpose through S. M. Nanavati Trust for the benefit
            of the underprivileged. Along with other numerous charities in
            education and medical fields the trust is also supporting an old age
            home in Sola Bhagvat Vidhyapith.
          </p>
          <p className="page-text fs-5 text-left text-justify">
            We do not have any branches anywhere. Please beware of imitators who
            may be using SWAYAMWAR as part of their marriage bureau's name.
            SWAYAMWAR COMPUTERISED MARRIAGE BUREAU is a trade mark of S. M.
            Nanavati Public Charitable Trust registered under the Trade Marks
            Act, 1999.
          </p>
          <p className="page-text fs-5 text-left text-justify">
            Since 2014, we have 6000+ New registration from countries like US,
            UK, Canada, Australia, New Zealand and Japan. We have more than 500
            candidates who found their soul mates through us per year.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
