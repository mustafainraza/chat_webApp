import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home.js";
import { Signup } from "./Signup.js";
import { Forgetpassword } from "./Forgetpassword.js";
import { Login } from "./Login.js";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgetpassword" element={<Forgetpassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
