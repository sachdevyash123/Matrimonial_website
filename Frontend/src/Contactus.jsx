import React from "react";
import Button from "@mui/material/Button";

function Contactus() {
  return (
    <div>
      <section class="mb-4 container mt-2">
        <h2
          class="h1-responsive font-weight-bold text-center"
          style={{ marginTop: "70px" }}
        >
          Contact us
        </h2>

        <p className="text-center w-responsive mx-auto mb-5 fs-4">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>

        <div class="row  justify-content-center align-items-center">
          <div
            class="col-md-9 mb-md-0 mb-5  "
            style={{ justifyContent: "center" }}
          >
            <form
              id="contact-form"
              name="contact-form"
              action="mail.php"
              method="POST"
            >
              <div class="row">
                <div class="col-md-6">
                  <div class="md-form mb-0">
                    <label for="name" className="fs-4">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="md-form mb-0">
                    <label for="email" className="fs-4">
                      Your email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="md-form mb-0">
                    <label for="subject" className="fs-4">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="md-form">
                    <label for="message" className="fs-4">
                      Your message
                    </label>
                    <textarea
                      type="text"
                      id="message"
                      name="message"
                      rows="2"
                      class="form-control md-textarea"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>

            <div class="text-center text-md-left mt-3">
              <Button
                content="contained"
                style={{ backgroundColor: "lightblue" }}
              >
                Register
              </Button>
            </div>
            <div class="status"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contactus;
