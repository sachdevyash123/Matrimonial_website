import React from "react";
import "./Profile.css"; // Create a CSS file for styling
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {
  let { id } = useParams();
  let idd = parseInt(id);

  const addtoCarthandler = () => {
    // alert("added to cart"+{id})
  };

  const [profiles, setProfiles] = useState([]);

  const [cookies, setCookie] = useCookies(["access", "refresh"]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/getprofile/${id}`, {
        headers: {
          Authorization: "JWT " + cookies.access,
        },
      })
      .then((res) => {
        setProfiles({
          ...res.data.profile,
          age: res.data.age,
          email: res.data.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Sample profile data (replace with actual data)
  return (
    <>
      {profiles ? (
        <>
          <div className="container" style={{ marginTop: "80px" }}>
            <h2 className="text-center mb-5 mt-5">
              {profiles.first_name +
                " " +
                profiles.middle_name +
                " " +
                profiles.last_name}{" "}
            </h2>
            <div class="row">
              <div class="col-md-4">
                <img src={profiles.image} width="100%" alt="" />
              </div>
              <div class="col-md-8">
                <table
                  class="table table-borderless"
                  style={{ fontSize: "20px" }}
                >
                  <thead>
                    <tr>
                      <th>Gender</th>
                      <th>{profiles.gender}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Age</td>
                      <td>{profiles.age} Years</td>
                    </tr>
                    <tr>
                      <td>Height </td>
                      <td>{profiles.height} feet</td>
                    </tr>
                    <tr>
                      <td>Location</td>
                      <td>{profiles.prlocation}</td>
                    </tr>

                    <tr>
                      <td>Education</td>
                      <td>{profiles.education}</td>
                    </tr>

                    <tr>
                      <td>Income</td>
                      <td>{profiles.income} Lakh</td>
                    </tr>
                    <tr>
                      <td>Caste</td>
                      <td>{profiles.cast}</td>
                    </tr>
                    <tr>
                      <td>Contact number</td>
                      <td>{profiles.number}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <h2 className="mt-5 text-center mb-5">Peronal Details</h2>
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <table
                    class="table table-borderless"
                    style={{ fontSize: "20px" }}
                  >
                    <tbody>
                      <tr>
                        <td>Email :</td>
                        <td>{profiles.email}</td>
                      </tr>
                      <tr>
                        <td>DOB :</td>
                        <td>{profiles.date}</td>
                      </tr>
                      <tr>
                        <td>Disability </td>
                        <td>{profiles.disability ? <>Yes</> : <>No</>}</td>
                      </tr>
                      <tr>
                        <td>Hobbies</td>
                        <td>{profiles.hobbies}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="col-md-6">
                  <table
                    class="table table-borderless"
                    style={{ fontSize: "20px" }}
                  >
                    <tbody>
                      <tr>
                        <td>Father Name :</td>
                        <td>{profiles.father_name}</td>
                      </tr>
                      <tr>
                        <td>Mother Name :</td>
                        <td>{profiles.mother_name}</td>
                      </tr>
                      <tr>
                        <td>status : </td>
                        <td>{profiles.status}</td>
                      </tr>
                      <tr>
                        <td>Occuptation</td>
                        <td>{profiles.occupation}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>No data</>
      )}
    </>
  );
};

export default Profile;
