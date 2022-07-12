import logo from './logo.svg';
// import React from 'react';
import './App.css';
import React, {useState} from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
// import StarRating from './StarRating';
function App() {
  const [vendor_email, setvendor_email]=useState();
  const [rate_id,setRate_id]=useState();
  const [session_id,setSession_id]=useState();
  const [rate_list,setRating]=useState();
  const [hover,setHover]=useState(); 

  const handleprint = () =>{
    // e.preventDefault();
    // console.log(rate_id+"hhhh");
  }

  const postt = async() =>{
    console.log({rate_list,rate_id,session_id,vendor_email})
    axios.post('http://localhost:8064/rating/',{
      rate_list:rate_list,
      rate_id:rate_id,
      session_id:session_id,
      vendor_email:vendor_email
    }).then(result=>{
      console.log(result.data)
      alert('Success')
    })
    .catch(error=>{
      alert('Error')
      console.log(error)
    })
  }

  return(
    <div className="main">
      <div className="sub-main">
        <div className='stars'>
          <h1><u>REVIEW</u></h1>
        {[...Array(5)].map((star,i)=>{
            const ratingValue =i+1;
            return <label>
                <input type ="radio" 
                name="rating" 
                value={ratingValue}
                onClick={() => setRating(ratingValue)} 
                 /> 
                <FaStar className="Star"
                 color={ratingValue <= (hover || rate_list) ? "#c050f0" :"lightgrey"} 
                 size={60}
                 onMouseEnter={() => setHover(ratingValue)} 
                 onMouseLeave={() => setHover(null)} 
                 />
                 </label>;
        })}
        <p>The Rating is {rate_list}.</p>
        <input type="number" value={rate_id} onChange={(e)=>{setRate_id(e.target.value)}} name="session_id" /> <br/>
        <input type="number" value={session_id} onChange={(e)=>{setSession_id(e.target.value)}} name="session_id" /> <br/>
        <input type="text" value={vendor_email} onChange={(e)=>{setvendor_email(e.target.value)}} name="vendor_email" /> <br/> 
        {/* <button onClick={handleprint}>print</button> */}
        {/* <button onClick={post} className = "btn btn-primary">Post</button> */}
        <button type="button" onClick={postt}>Post</button>
    </div>
    </div>
    </div>
    
 )
}

// import logo from './logo.svg';
// import './App.css';
// import React, {useState} from "react";
// import axios from 'axios';

// function App() {
//   const [c_email, setc_email]=useState("xyz");
//   const [v_email, setv_email]=useState("abc");
//   const [status, setstatus]=useState(false);

//   const End_conversation = async() =>{
//     console.log({c_email,status})
//     axios.put('http://localhost:8064/available_server/c_email/',{
//         c_email:c_email,
//         status:status

//     }).then(result=>{
//       console.log(result.data)
//       alert('Success')
//     })
//     .catch(error=>{
//       alert('Error')
//       console.log(error)
//     })
//   }

//   const End_Vendor = async() =>{
//     console.log({v_email})
//     axios.delete('http://localhost:8064/available_server',{
//          v_email:v_email

//     }).then(result=>{
//       console.log(result.data)
//       alert('Success')
//     })
//     .catch(error=>{
//       alert('Error')
//       console.log(error)
//     })
//   }

//   return(
//     <div>
//         <input type="text" value={c_email} onChange={(e)=>{setc_email(e.target.value)}} name="c_email" /> <br/> 
//        <button type="button" onClick={End_conversation}>End Client</button>
//        <input type="text" value={v_email} onChange={(e)=>{setv_email(e.target.value)}} name="v_email" /> <br/> 
//        <button type="button" onClick={End_Vendor}>End Vendor</button>
//     </div>
// )
// }


 export default App;





