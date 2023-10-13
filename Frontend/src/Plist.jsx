import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Cookie } from "@mui/icons-material";
import { useCookies } from "react-cookie";

const Plist = () => {
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [cast, setCast] = useState("");
  const [gender, setGender] = useState("");
  const [profiles, setProfiles] = useState([]);
  const filteredProfiles = profiles.filter((data) => {
    const age = data.age;
    const profileCast = data.profile.cast;
    const profileGender = data.profile.gender;

    const isAgeInRange =
      (minAge === "" || age >= minAge) && (maxAge === "" || age <= maxAge);

    const isCastMatched = cast === "" || cast === profileCast;

    const isGenderMatched = gender === "" || gender === profileGender;

    return isAgeInRange && isCastMatched && isGenderMatched;
  });
  const [cookies, setCookie] = useCookies(["access", "refresh"]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/userview/", {
        headers: {
          Authorization: "JWT " + cookies.access,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div
        className="text-center fw-bold mb-3"
        style={{
          backgroundColor: "skyblue",
          color: "red",
          marginTop: "100px",
          fontSize: "30px",
          fontFamily: "serif",
        }}
      >
        Find Your Mate
      </div>
      <div className="filter d-flex justify-content-center container-fluid">
        {/* <div className="col-sm-3">
          <div className="mb-2">Select Min Age</div>
          <input
            type="number"
            placeholder="Min Age"
            value={minAge}
            onChange={(e) => setMinAge(Number(e.target.value))}
          />
        </div>
        <div className="col-sm-3">
          <div className="mb-2">Min Age</div>
          <input
            type="number"
            placeholder="Max Age"
            value={maxAge}
            onChange={(e) => setMaxAge(Number(e.target.value))}
          />
        </div> */}
        <div>
          <label for="cast" class="form-label">
            Select Cast
          </label>

          <select
            class="form-select"
            id="cast"
            name="cast"
            onChange={(e) => setCast(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="" selected>
              ---
            </option>
            <option value="Hindu">Hindu</option>
            <option value="Jain">Jain</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Sindhi">Sindhi</option>
          </select>
        </div>
      </div>

      <div className="profiles">
        {filteredProfiles.map((profile) => (
          <div className="row justify-content-center" key={profile.__id}>
            <div className="row justify-content-center">
              <div class="card mb-3" style={{ maxWidth: "1000px" }} id="pl">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src={profile.profile.image}
                      class="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <Link to={`/Profile/${profile.id}`}>
                        <h5 class="card-title">{profile.profile.first_name}</h5>
                      </Link>
                      <p class="card-text">
                        Education: {profile.profile.education}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Plist;
