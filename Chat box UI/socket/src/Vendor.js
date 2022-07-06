import React from "react";
import "./Vendor.css";

import { Link } from "react-router-dom";

function Vendor({ vendoremail, setVendoremail }) {
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="em">
            <input
              placeholder="Vendor Email"
              value={vendoremail}
              onChange={(event) => {
                setVendoremail(event.target.value);
              }}
            ></input>
            {console.log(vendoremail)}
          </div>
          <div>
            <Link to="/conversation">
              <button className="vbtn">Live</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendor;
