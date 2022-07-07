// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home.js";
import { Signup } from "./Signup.js";
import { Forgetpassword } from "./Forgetpassword.js";
import { Login } from "./Login.js";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home/>
            }
          />
          <Route
            path="/Signup"
            element={<Signup />}
          />
          <Route path="/Forgetpassword" element={<Forgetpassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
