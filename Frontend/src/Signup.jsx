import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import background from "./login.jpg";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import axios from "axios";

function Signup() {
  const myStyle = {
    backgroundImage: `url(${background})`,
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters, including a lowercase letter and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const [formData, setFormData] = useState({ cast: "Hindu" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (formData.image && !allowedImageTypes.includes(formData.image.type)) {
      toast.error("Please select a valid image file (JPEG or PNG).");
      return; // Stop the submission
    }
    // Perform further actions if both password and email are valid.
    if (!passwordError && !emailError) {
      console.log(formData);
      axios
        .post("http://localhost:8000/api/user/register/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data) {
            toast.success("verify your email");

            navigate("/Login");
          }
        })
        .catch((error) => {});
    }
  };
  return (
    <>
      <div
        className="vh-70 d-flex justify-content-center align-items-center mt-5 "
        style={{ userSelect: "none" }}
      >
        <div className="container ">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 ">
              <div className="card bg-white " style={myStyle}>
                <div className="card-body p-5 ">
                  <form
                    className="mb-3 mt-md-4 "
                    action="reg2.html"
                    onSubmit={handleSubmit}
                  >
                    <h2 className="fw-bold mb-2 text-uppercase text-center ">
                      Register Now!
                    </h2>

                    <div className="mb-3">
                      <label for="fname" className="form-label fs-5">
                        Firstname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fname"
                        name="first_name"
                        onChange={handleChange}
                        placeholder="Firstname "
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label for="mname" className="form-label fs-5">
                        Middlename
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mname"
                        name="middle_name"
                        onChange={handleChange}
                        placeholder="Fathername "
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label for="lname" className="form-label fs-5">
                        Lastname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lname"
                        name="last_name"
                        onChange={handleChange}
                        placeholder="Caste "
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label for="username" className="form-label fs-5">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label d-flex fs-5">Gender</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="Male"
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label fs-5" for="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="Female"
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label fs-5" for="female">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="number" className="form-label fs-5 ">
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="number"
                        name="number"
                        min={1000000000}
                        minLength={10}
                        maxLength={10}
                        max={9999999999}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10);
                        }}
                        onChange={handleChange}
                        placeholder="1234567895"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label for="email" className="form-label fs-5">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          emailError ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        placeholder="abc@gmail.com"
                        onChange={handleChange}
                        onBlur={validateEmail}
                        required
                      />
                      {emailError ? (
                        <div className="invalid-feedback">{emailError}</div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="mb-3">
                      <label for="password" className="form-label fs-5">
                        Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${
                          passwordError ? "is-invalid" : ""
                        }`}
                        id="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={validatePassword}
                        required
                      />
                      {passwordError && (
                        <div className="invalid-feedback">{passwordError}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label for="DOB" className="form-label fs-5">
                        Date Of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="DOB"
                        name="date"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="height" class="form-label fs-5">
                        Height
                      </label>

                      <select
                        class="form-select"
                        id="height"
                        name="height"
                        onChange={handleChange}
                        required
                      >
                        <option selected hidden>
                          --Select Your Height--
                        </option>
                        <option value="4'6">4'6"</option>
                        <option value="4'7">4'7"</option>
                        <option value="4'8">4'8"</option>
                        <option value="4'9">4'9"</option>
                        <option value="5'0">5'0"</option>
                        <option value="5'1">5'1"</option>
                        <option value="5'2">5'2"</option>
                        <option value="5'3">5'3"</option>
                        <option value="5'4">5'4"</option>
                        <option value="5'5">5'5"</option>
                        <option value="5'6">5'6"</option>
                        <option value="5'7">5'7"</option>
                        <option value="5'8">5'8"</option>
                        <option value="5'9">5'9"</option>
                        <option value="6'0">6'0"</option>
                        <option value="6'1">6'1"</option>
                        <option value="6'2">6'2"</option>
                        <option value="6'3">6'3"</option>
                        <option value="6'4">6'4"</option>
                        <option value="6'5">6'5"</option>
                        <option value="6'6">6'6"</option>
                        <option value="6'7">6'7"</option>
                        <option value="6'8">6'8"</option>
                        <option value="6'9">6'9"</option>
                        <option value="7'0">7'0"</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="cast" class="form-label fs-5">
                        Select Cast
                      </label>

                      <select
                        class="form-select"
                        id="cast"
                        name="cast"
                        onChange={handleChange}
                        required
                      >
                        <option value="Hindu">Hindu</option>
                        <option value="Jain">Jain</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Sindhi">Sindhi</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label d-flex fs-5">
                        Maritial Status
                      </label>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="status"
                          id="single"
                          value="single"
                          onChange={handleChange}
                          required
                        />
                        <label class="form-check-label" for="single">
                          Single
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="status"
                          id="divorced"
                          value="divorced"
                          onChange={handleChange}
                          required
                        />
                        <label class="form-check-label" for="divorced">
                          Divorced
                        </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="status"
                          id="widowed"
                          value="widowed"
                          onChange={handleChange}
                          required
                        />
                        <label class="form-check-label" for="widowed">
                          Widowed
                        </label>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="father" class="form-label fs-5">
                        Fathers Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="father_name"
                        name="father_name"
                        onChange={handleChange}
                        placeholder="Fathers Name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="mother" class="form-label fs-5">
                        Mothers Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="mother_name"
                        name="mother_name"
                        placeholder="Mothers Name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="education" class="form-label fs-5">
                        Education
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="education"
                        name="education"
                        onChange={handleChange}
                        placeholder="e.g. B.E. Computer Engineering"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="Occupation" class="form-label fs-5">
                        Occupation
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Occupation"
                        name="occupation"
                        onChange={handleChange}
                        placeholder="Computer Engineeer"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="height" class="form-label fs-5">
                        Annual Income
                      </label>

                      <select
                        class="form-select"
                        id="income"
                        name="income"
                        onChange={handleChange}
                        required
                      >
                        <option selected hidden>
                          --Select Your Annual Income--
                        </option>
                        <option value="0-2.5">Rs. 0-2.5 Lakhs per year</option>
                        <option value="2.5-5.0">
                          Rs. 2.5-5.0 Lakhs per year
                        </option>
                        <option value="5.0-7.5">
                          Rs. 5.0-7.5 Lakhs per year
                        </option>
                        <option value="7.5-10">
                          Rs. 7.5-10 Lakhs per year
                        </option>
                        <option value="10-20">Rs. 10-20 Lakhs per year</option>
                        <option value="20-30">Rs. 20-30 Lakhs per year</option>
                        <option value="30-40">Rs. 30-40 Lakhs per year</option>
                        <option value="40-50">Rs. 40-50 Lakhs per year</option>
                        <option value="50+">Rs. 50+ Lakhs per year</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="prlocation" class="form-label fs-5">
                        Present Location
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="prlocation"
                        name="prlocation"
                        onChange={handleChange}
                        placeholder="e.g. Ahmedabad"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="hobbies" class="form-label fs-5">
                        Hobbies
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="hobbies"
                        name="hobbies"
                        onChange={handleChange}
                        placeholder="e.g. music,travelling"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label mx-auto d-flex fs-5  ">
                        Physical Disability
                      </label>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="disability"
                          id="yes"
                          value="yes"
                          onChange={handleChange}
                          required
                        />
                        <label class="form-check-label fs-5" for="yes">
                          Yes
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="disability"
                          id="no"
                          value="no"
                          onChange={handleChange}
                          required
                        />
                        <label class="form-check-label fs-5" for="no">
                          No
                        </label>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="formFile" class="form-label fs-5">
                        Image
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        id="formFile"
                        name="image"
                        onChange={handleImageChange}
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <Button
                        variant="contained"
                        className=" "
                        type="submit"
                        disabled={!!passwordError || !!emailError}
                        style={{ width: "100%", backgroundColor: "green" }}
                      >
                        Register <HowToRegIcon />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
