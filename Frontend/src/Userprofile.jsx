import React, { useEffect, useState } from "react";
import Keyush from "./keyush.png";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
function Userprofile() {
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    console.log(isLoggedIn);
  });
  const [cookies, setCookies] = useCookies(["access", "refresh"]);
  const deleteUser = () => {
    axios
      .delete("http://localhost:8000/api/user/profile/", {
        headers: { Authorization: "JWT " + cookies.access },
      })
      .then((res) => {
        if (res) {
          const expirationDate = new Date(); // Create a new Date object
          expirationDate.setDate(expirationDate.getDate() - 1);

          setCookies("access", "", { expires: expirationDate });
          setCookies("refresh", "", { expires: expirationDate });
          window.location.href = "/";
        }
      })
      .catch((err) => {});
  };

  const { image, ...profileWithoutImage } = isLoggedIn.profile;
  const [formData, setFormData] = useState({
    ...profileWithoutImage,
    email: isLoggedIn.email,
    username: isLoggedIn.username,
  });

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
  const updateSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/user/profile/", formData, {
        headers: {
          Authorization: "JWT " + cookies.access,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data) {
          window.location.href = "/Dashboard";
        }
      })
      .catch((err) => {
        window.location.href = "/Dashboard";
      });
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <br />{" "}
      {isLoggedIn ? (
        <div className="m-5 bg-white rounded-4 p-2 p-md-3 p-lg-4 p-xl-5 ">
          <div className="d-flex justify-content-center">
            <div
              className=" mt-5  overflow-hidden"
              style={{ width: "150px", height: "150px" }}
            >
              <img
                src={"http://localhost:8000" + isLoggedIn.profile.image}
                className="rounded-circle"
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          <h1 className="text-center mt-3 text-sm text-md-lg text-xl-xl normal__text"></h1>
          {/* detail table */}
          <div class="container ">
            {/* head row is here --------- */}
            <div
              className="  row rounded-3 p-4 mt-4"
              style={{ backgroundColor: "#f3e8d68e" }}
            >
              <div className=" col">
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  First Name
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Middle Name
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Last Name
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Gender
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Number
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Email
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  DOB
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Age
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Maritial Status
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Father Name
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Mother Name
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Education
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Location
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Height (in feet)
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Cast
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Income (in LPA)
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Occupation
                </div>
                <div className="  border__red fw-bold p-sm-2 p-4 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  Physical Disablitiy
                </div>
              </div>
              <div className=" col">
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.first_name ? (
                    <>{isLoggedIn.profile.first_name}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.middle_name ? (
                    <>{isLoggedIn.profile.middle_name}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.last_name ? (
                    <>{isLoggedIn.profile.last_name}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.gender ? (
                    <>{isLoggedIn.profile.gender}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.number ? (
                    <>{isLoggedIn.profile.number}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.email}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.date ? (
                    <>{isLoggedIn.profile.date}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.age ? (
                    <>{isLoggedIn.age} year old</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.status ? (
                    <>{isLoggedIn.profile.status}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.father_name ? (
                    <>{isLoggedIn.profile.father_name}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.mother_name ? (
                    <>{isLoggedIn.profile.mother_name}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.education ? (
                    <>{isLoggedIn.profile.education}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.prlocation ? (
                    <>{isLoggedIn.profile.prlocation}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.height ? (
                    <>{isLoggedIn.profile.height}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.cast ? (
                    <>{isLoggedIn.profile.cast}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.income ? (
                    <>{isLoggedIn.profile.income}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.occupation ? (
                    <>{isLoggedIn.profile.occupation}</>
                  ) : (
                    <> Data not available</>
                  )}
                </div>
                <div className="  border__red p-4 p-sm-2 p-md-3 p-lg-4 res__text fs-4 normal__text">
                  {isLoggedIn.profile.disability ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-success me-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Update Profile
            </button>
            <div
              class="modal fade "
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h2 className="fw-bold mb-2 text-uppercase text-center ">
                      Register Now!
                    </h2>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form
                      className="mb-3 mt-md-4 "
                      action="reg2.html"
                      onSubmit={updateSubmit}
                    >
                      <div className="mb-3">
                        <label for="email" className="form-label fs-5">
                          Email
                        </label>
                        <input
                          type="email"
                          className={`form-control `}
                          id="email"
                          name="email"
                          placeholder="abc@gmail.com"
                          value={formData.email}
                        />
                      </div>{" "}
                      <div className="mb-3">
                        <label for="username" className="form-label fs-5">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={formData.username}
                          placeholder="Username"
                        />
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
                          value={isLoggedIn.profile.number}
                          placeholder="1234567895"
                          required
                        />
                      </div>
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
                          value={formData.first_name}
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
                          value={formData.middle_name}
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
                          value={formData.last_name}
                          placeholder="Caste "
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
                            checked={formData.gender === "Male"}
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
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label fs-5" for="female">
                            Female
                          </label>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="height" class="form-label fs-5">
                          Height
                        </label>

                        <select
                          class="form-select"
                          id="height"
                          name="height"
                          value={formData.height}
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
                          value={formData.cast}
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
                            checked={formData.status === "single"}
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
                            checked={formData.status === "divorced"}
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
                            checked={formData.status === "widowed"}
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
                          value={formData.father_name}
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
                          value={formData.mother_name}
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
                          value={formData.education}
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
                          value={formData.occupation}
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
                          value={formData.income}
                          onChange={handleChange}
                          required
                        >
                          <option selected hidden>
                            --Select Your Annual Income--
                          </option>
                          <option value="0-2.5">
                            Rs. 0-2.5 Lakhs per year
                          </option>
                          <option value="2.5-5.0">
                            Rs. 2.5-5.0 Lakhs per year
                          </option>
                          <option value="5.0-7.5">
                            Rs. 5.0-7.5 Lakhs per year
                          </option>
                          <option value="7.5-10">
                            Rs. 7.5-10 Lakhs per year
                          </option>
                          <option value="10-20">
                            Rs. 10-20 Lakhs per year
                          </option>
                          <option value="20-30">
                            Rs. 20-30 Lakhs per year
                          </option>
                          <option value="30-40">
                            Rs. 30-40 Lakhs per year
                          </option>
                          <option value="40-50">
                            Rs. 40-50 Lakhs per year
                          </option>
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
                          value={formData.prlocation}
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
                          value={formData.hobbies}
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
                            checked={formData.disability === true}
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
                            checked={formData.disability === false}
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
                        />
                      </div>
                      <div className="d-grid">
                        <Button
                          variant="contained"
                          className=" "
                          type="submit"
                          style={{ width: "100%", backgroundColor: "green" }}
                        >
                          Register <HowToRegIcon />
                        </Button>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" onClick={deleteUser} class="btn btn-danger">
              Delete Profile
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Userprofile;
