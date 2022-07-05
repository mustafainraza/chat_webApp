import React from "react";
import { Link } from "react-router-dom";

function Selection() {
  return (
    
    <div className="container">
      <Link to="/client">
            <button >Client</button>
      </Link>
      <Link to="/vendor">
            <button >Vendor</button>
      </Link>
    </div>
    
  );
}

export default Selection;
