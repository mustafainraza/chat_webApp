import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Selection from "./Selection";
import Client from "./Client";
import { useState } from "react";
import Vendor from "./Vendor";
import Conversation from "./Conversation";

function App() {
  const [vendoremail, setVendoremail] = useState("");
  // const [assigned, setAssigned] = useState("");

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Selection />} />
          <Route path="/client" element={<Client />} />
          <Route
            path="/vendor"
            element={
              <Vendor
                vendoremail={vendoremail}
                setVendoremail={setVendoremail}
              />
            }
          />
          <Route
            path="/conversation"
            element={
              <Conversation
                vendoremail={vendoremail}
                // assigned={assigned}
                setVendoremail={setVendoremail}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
