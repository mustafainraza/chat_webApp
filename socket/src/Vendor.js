import React from "react";

import { Link } from "react-router-dom";



function Vendor({vendoremail,setVendoremail}) {

  return (
    
    <div>
        <input value={vendoremail} onChange={(event) => {setVendoremail(event.target.value);}}></input>
    {console.log(vendoremail)}
        <Link to="/conversation" >
        <button>Live</button>
        </Link>
        <button></button>
    </div>
    
  );
}

export default Vendor;