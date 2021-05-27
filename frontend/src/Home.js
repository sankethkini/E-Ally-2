import React,{ useEffect,useState } from "react";
import { Redirect } from "react-router-dom"
import {getUser} from "./Auth/apiAuth"
import axios from "axios"


const Home= (props)=>{
    const [login,setLogin] = useState(0);
   
    useEffect(()=>{
     
       getUser().then((data)=>{
           console.log(data)
         localStorage.setItem("email",data.data.tokenuser.email)
         setLogin(1)
       })
       .catch((err)=>{
           setLogin(2)
       })
       
        
    });

  if(login === 0){
      return (<h1>loading </h1>)
  }
  else if(login === 1){
    
    return (<h1>Home page {localStorage.getItem("email")}</h1>)
  }
  else{
     return ( <Redirect to="/login"></Redirect> )
  }
};

export default Home;
