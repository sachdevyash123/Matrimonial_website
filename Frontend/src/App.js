import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Login from "./Login";

// import Nav from "./Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import About1 from "./About1";
import Contactus from "./Contactus";
import Home from "./Home";
import Signup from "./Signup";
import background from "./bg3.jpg";
import Footer from "./Footer";
import Profile from "./Profile";
import Plist from "./Plist";
import "./style.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Userprofile from "./Userprofile";

function Appcontent() {
  // const myStyle = {
  //   // backgroundImage: `url(${background})`,
  //   backgroundColor: '#F3E8D6'
  // };
  const { isLoggedIn } = useAuth();
  return (
    <div style={{ background: "#F3E8D6" }} className="hide-scrollbars">
      <Navbar />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/H" element={Home} />/ */}
        <Route path="/About" element={<About1 />} />
        <Route path="/Contact" element={<Contactus />} />
        {isLoggedIn ? (
          <>
            <Route path="/Plist" element={<Plist />} />
            <Route path="/Wishlist" element={<Plist />} />
            <Route path="/Profile/:id" element={<Profile />} />
            <Route path="/Dashboard" element={<Userprofile />} />
            <Route path="/*" element={<Navigate to="/Dashboard" />} />
          </>
        ) : (
          <>
            {" "}
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/*" element={<Navigate to="/Login" />} />
          </>
        )}
      </Routes>
      {/* <Chatbot/> */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      {" "}
      <AuthProvider>
        <Router>
          <Appcontent />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
