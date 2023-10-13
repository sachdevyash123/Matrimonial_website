// AuthContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [cookie, setCookie] = useCookies(["access", "refresh"]);
  useEffect(() => {
    if (cookie.access && cookie.refresh) {
      axios
        .get("http://localhost:8000/api/user/profile/", {
          headers: { Authorization: "JWT " + cookie.access },
        })
        .then((res) => {
          if (res.data.username) {
            setIsLoggedIn(res.data);
          } else {
            setIsLoggedIn(null);
          }
        });
      // setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
