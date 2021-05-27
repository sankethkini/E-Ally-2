import React, { useState, useEffect, useRef } from "react";
import { Button, Carousel, Card } from "react-bootstrap";
import { relatedUser } from './apiMain';
import Cards from "./Cards"
import MainNav from "./MainNav"
import  { Redirect,Link} from "react-router-dom"
import {getUser} from "../Auth/apiAuth"
import { io } from "socket.io-client";
  

function MainPage(props) {
 

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [login,setLogin] =useState(true)
  const [resc,setResc] = useState([]);
  const [soc,setSoc]=useState(0);
  const [chat,setChat]=useState({});
  useEffect(() => {
    const fetchusers = async () => {
       await relatedUser().then((data)=>{
        if(data[1]==501){
          setLoading(false)
          setLogin(false)
        }
        else{
          console.log(data)
          setUsers(data[0].resl);
          setResc(data[0].resc);
          setLoading(false);
          setLogin(true)
        }
       })
       .catch((err)=>{
         console.log(err);
         
       })
     
    };
    fetchusers();
  }, []);
  let socket=window.socket
  useEffect(async ()=>{
    
    await getUser().then((dat)=>{

  
  socket.on('connect', () => {
    console.log(socket.id); })
     let user=dat.data.tokenuser.email
      let data={
        sender:user
      }
      socket.emit('new_user',data)
    })
    .catch((err)=>{
      console.log(err)
    })
  
  },[])
useEffect(()=>{
  socket.on('new_message',(d)=>{
    let m={"send":d.sender,"msg":d.message}
    localStorage.setItem("msgs",JSON.stringify(m))
  })
})
  const Adpage = () => (
    <Carousel>
      <Carousel.Item>
        {/* image of size 640*317 */}
        <img
          className="d-block w-100"
          src="https://s3.amazonaws.com/images.seroundtable.com/google-css-images-1515761601.jpg"
          alt="First slide"
          style={{ "height": "27rem" }} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://s3.amazonaws.com/images.seroundtable.com/google-css-images-1515761601.jpg"
          alt="Third slide"
          style={{ "height": "27rem" }} />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>

        <img
          className="d-block w-100"
          src="https://s3.amazonaws.com/images.seroundtable.com/google-css-images-1515761601.jpg"
          alt="Third slide"
          style={{ "height": "27rem" }} />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );

  if(!login){
    return (<Redirect to={{pathname:"/login" }}></Redirect>)
  }
  if (!loading) {

    return (
      <div>
        <MainNav />
        {Adpage()}
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            {users.map((val, key) => {
              return (
                <div className="col-md-4">
                  <Cards data={val} key={key}  type="user"/>
                  <br></br>
                </div>
              );
            })
            }
         </div>
         
            <br></br>
            <hr></hr>
            <div className="row">
                {resc.map((val,key)=>{
                  return(
                    <div className="col-md-12">
                      <Cards data={val} type="flatcards"/>
                      <br></br>
                    </div>
                  )
                })}
            </div>
        <br></br>
      </div>
      </div>
    );
  }
  else if(loading){
    return (
      <div>
        <MainNav />
        {Adpage()}
        <br></br>
        <br></br>
        <div className="container">
          <h3>Loading ...</h3>
        </div>
        <br></br>

      </div>
    );
  }
  
}

export default MainPage;