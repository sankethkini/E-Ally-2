import React, { useState, useEffect } from "react";
import { Link,Redirect } from "react-router-dom"
import { Button, Nav, Navbar, Carousel,NavDropdown,Dropdown } from "react-bootstrap";


const MainNav = (props) => {
  const [msg,setMsg]=useState({send:"no new msg",msg:""})
  
  const [search,setSearch]=useState("");
  const handleChange = (event)=>{
      console.log("fgh")
      setSearch(event.target.value)
  }
  const handleLogout = (event)=>{
      localStorage.removeItem("token");
      window.location.reload(false);
  }
  useEffect(()=>{
      let msg1=JSON.parse(localStorage.getItem("msgs"));
      if(msg1!==null){
        setMsg(msg1)
      }
  })
  
  
  return (


      <div>
       <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/main">Navbar</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active" style={{backgroundColor:"#323ea8"}}>
                <Link className="nav-link" to={{pathname:"/branch",onprops:{option:"askforskills"}}}>+ required skills</Link>
              </li>
              <li className="nav-item active ml-3" style={{backgroundColor:"#323ea8"}}>
              <Link className="nav-link" to={{pathname:"/branch",onprops:{option:"selectskills"}}}>+ add my skills</Link>
              </li>
              <li className="nav-item active ml-3" style={{backgroundColor:"#323ea8"}}>
              <Link className="nav-link" to={{pathname:"/branch",onprops:{option:"contribute"}}}>+ contribute</Link>
              </li>
              <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
              </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                    <Dropdown.Item href={"/chat/"+msg.send}>{msg.send}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </ul>
          </div>
        <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" value={search} onChange={(e)=>handleChange(e)}/>
          <Link className="btn btn-outline-success my-2 my-sm-0" to={{pathname:"/search",onprops:{query:search}}}>Search</Link>
        </form>
        <p className="nav-link">  </p>
        <li className="nav-item active mr-auto">
        <Link className="btn btn-success my-2 my-sm-0" to={{pathname:"/myprofile"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        < path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>Profile</Link>
        </li>
        <li className="nav-item active ml-3">
        <button className="btn btn-primary my-2 my-sm-0" onClick={(e)=>handleLogout(e)}>Logout</button>
        </li>
        </nav>
      </div>

  )
};

export default MainNav;

