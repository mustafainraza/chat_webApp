import "./App.css";
import ChatBox from "./components/ChatBox";
import UserRegister from "./components/UserRegister";
import VendorRegister from "./components/VendorRegister";
import "react-toastify/dist/ReactToastify.css";
import Temp from "./Temp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VendorChatBox from "./components/VendorChatBox";

function App() {
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<UserRegister />} />
              <Route path="/vendor" element={<VendorRegister />} />
              <Route path="/temp" element={<Temp />} />
              <Route path="/chatbox" element={<ChatBox />} />
              <Route path="/vendorchatbox" element={<VendorChatBox />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
