import React from "react";
import "./style.css";

const Contact = () => {
  return (
    <>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6 mt-4 ">
            <h2>Contact Us</h2>
            <p>
              If you have any questions or inquiries, feel free to reach out to
              us. Our team will be happy to assist you.
            </p>
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Your Name"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Your Email"
                />
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea
                  class="form-control"
                  id="message"
                  rows="5"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div class="col-md-6 mt-4">
            <h2>Address</h2>
            <p>
              <strong>MatrimonialSite</strong>
            </p>
            <p>123 Main Street</p>
            <p>City, Country</p>
            <h2>Contact Information</h2>
            <p>Email: info@matrimonialsitewebsite.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
