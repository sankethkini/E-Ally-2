import {React,useState} from "react";
import {Card,Button,Modal} from "react-bootstrap"
import {getUserDetails,getResc,getSkills} from './apiMain'
import { Link } from "react-router-dom"

const handleDetails=(event,usr)=>{
      event.preventDefault();
      let data={
        "id":[usr._id]
      }
     getUserDetails(data)
}
const handleSkills=(event,skl)=>{
  event.preventDefault();
  let data={
    "id":[skl._id]
  }
  
}
const handleResc=(event,rsc)=>{
  event.preventDefault();
  let data={
    "id":[rsc._id]
  }
  getResc(data)
}


const Cards = (props)=>{




const [show, setShow] = useState(false);
const [haveskills,setHaveskills]=useState([]);
const [intskills,setIntskills]=useState([]);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const intSkills=async (event,dat)=>{
  event.preventDefault();
  let data={
    "id":dat.gain
  }
  const resl=await getSkills(data);
  setIntskills(resl[0])

}

const haveSkills=async (event,dat)=>{
  event.preventDefault();
  let data={
    "id":dat.have
  }
  const resl=await getSkills(data);
  setHaveskills(resl[0])

}

    if(props.type == "user"){
     return (
     <Card style={{ width: '15rem' }} bg="dark" text="white">
    <Card.Img variant="top" src="https://www.pinclipart.com/picdir/middle/148-1481893_original-size-is-626-626-pixels-icon.png" />
    <Card.Body>
      <Card.Title>{props.data.name}</Card.Title>
      <Card.Text>
        <strong>Email:  </strong>{props.data.email}
      </Card.Text>
      {/* modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Email:</strong><p>{props.data.email}</p>
          <br></br>
          <strong>Skills have:</strong>
          {haveskills.map((val,key)=>{
            return(
              <li key={key}>{val.Topic}</li>
            )
          })}
          <br></br>
          <strong>Skills Interested:</strong>
          {intskills.map((val,key)=>{
            return(
              <li>{val.Topic}</li>
            )
          })}
          <br></br>
          <hr></hr>
          <strong>github:</strong><p>{props.data.github}</p>
          <br></br>
          <strong>linked in:</strong><p>{props.data.linkedin}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal */}
      <Button variant="primary" onClick={(e)=>{handleDetails(e,props.data);haveSkills(e,props.data);intSkills(e,props.data);handleShow();}} >Get Details</Button>
      <Link  to={{pathname:"/chat/"+props.data.email}}  className="btn btn-outline-secondary" style={{backgroundColor:"white"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
  <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
  <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
</svg></Link>
    </Card.Body>
    </Card>
    );
  }
  if(props.type == "resc"){
    return (
      <Card style={{ width: '15rem' }} bg="dark" text="white">
     <Card.Img variant="top" src="https://lh3.googleusercontent.com/tytWPISJC9FHFFEcYhjw-VgITMCVqaOs52CqEGyp5PlAlYn7P_eG1m6UD3jTGY-qoH6BKp6ukPw=e14-rj-sc0xffffff-w1270" />
     <Card.Body>
       <Card.Title>{props.data.title}</Card.Title>
       <Link className="btn btn-primary" to={{pathname:"/resource/"+props.data._id}}>See More..</Link>
     </Card.Body>
     </Card>
     );
  }
  if(props.type == "skills"){
    return (
      <Card style={{ width: '15rem' }} bg="dark" text="white">
     <Card.Img variant="top" src="https://lh3.googleusercontent.com/proxy/jypCZMyeSStHpR-ArbzdXJDe2X2EYBs9ojEvBQIt5V-x9yviQLMEkKzl88HN6jQ5_qFajl6z8vSR4I9MDtn2AEZikEMWWarG2pXPXCpyCSps48kpFSAYnHxUNzae-Xw3eDxvvBubzpCeK3M" />
     <Card.Body>
       <Card.Title>{props.data.Branch}</Card.Title>
       <Card.Text>
         <strong>Topic:  </strong>{props.data.Topic}
       </Card.Text>
       <Link  className="btn btn-primary" to={{pathname:"/skill/"+props.data._id}}>Explore</Link>
     </Card.Body>
     </Card>
     );
  }
  if(props.type == "flatcards"){
    return (
      
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>{props.data.title}</Card.Title>
          <Card.Text>
            This is contibuted by other users
          </Card.Text>
          <Link className="primary" to={{pathname:"/resource/"+props.data._id}}>See More</Link>
        </Card.Body>
      </Card>
    );
  }
}

export default Cards;