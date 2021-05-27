import {React,useEffect,useState,useRef} from 'react'
import {getUser} from "./Auth/apiAuth"
import styles from './chat.css'
import {Card} from 'react-bootstrap'
import {Link} from "react-router-dom"

const Chat = (props)=>{
   let socket=window.socket

   const [sen,setSen]=useState("");
   const [rec,setRec]=useState("");
   const [msg,setMsg]=useState("");
   const [chat,setChat]=useState([])
   

    useEffect(async ()=>{
    
        await getUser().then((dat)=>{
    
      
      socket.on('connect', () => {
        console.log(socket.id); })
         let user=dat.data.tokenuser.email
          let data={
            sender:user
          }
          socket.emit('new_user',data)
          setSen(user)
          setRec(props.location.pathname.split('/chat/')[1])
          let ms1=JSON.parse(localStorage.getItem("msgs"))
          if(ms1!==undefined || ms1!==null){
            let m={msg:ms1.msg,val:1}
            setChat([...chat,m])
          }
          localStorage.removeItem("msgs")
        })
        .catch((err)=>{
          console.log(err)
        })
        
      },[])
    useEffect(()=>{
      socket.on('new_message',(d)=>{
            let newmsg={msg:d.message,val:1}
            setChat([...chat,newmsg])
      })
    },)
    const clickHandler = (event)=>{
        event.preventDefault();
        let dat={
            sender:sen,
            reciever:rec,
            message:msg
        }
        socket.emit("new_message",dat)
        let newmsg={msg:dat.message,val:0}
        setChat([...chat,newmsg])
    }
    const handleMsg = (event) =>{
        setMsg(event.target.value)
    }


    var style = {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
        margin:"20px"
    }
    
    var phantom = {
      display: 'block',
      padding: '20px',
      height: '60px',
      width: '100%',
    }
    
    return(
        <div>
          
          <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/main">{rec}</Link>
          </nav>
           {chat.map((val,key)=>{
             if(val.val){
                 return(
                   <div className="row">
                     <div className="col-md-8"></div>
                     <Card style={{textAlign:"right",width:"18rem",float:"right",backgroundColor:"#56fc03"}} className="col-md-4">
                        <Card.Body>{val.msg}</Card.Body>
                    </Card>
                   </div>   
                  
                 )
             }
             else{
                 return(
                  <div className="row">
                 
                  <Card style={{textAlign:"right",width:"18rem",float:"left",backgroundColor:"#03cafc"}} className="col-md-4">
                     <Card.Body>{val.msg}</Card.Body>
                 </Card>
                 <div className="col-md-8"></div>
                </div>   
                 )
                 }
           })}
           <div>
               <div style={phantom}>
                    <div style={style}>
                      <div className="row">
                        <div className="col-md-10">
                        <input type="text" onChange={(e)=>handleMsg(e)} value={msg} style={{width:"100%",height:"100%"}}></input> 
                        </div>
                        <div className="col-md-2">
                        <button onClick={(e)=>clickHandler(e)} className="btn btn-primary xl"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                        </svg>send</button>
                        </div>
                      </div>
                    </div>
               </div>
           </div>
        </div>

    )
}

export default Chat