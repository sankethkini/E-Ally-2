import {React,useEffect,useState} from "react"
import { Form,Button,Card } from "react-bootstrap"
import {Redirect,Link} from 'react-router-dom'
import MainNav from './MainNav'
import {getResc,getSkills, updateprofile,Removemyskills,Removeforskills,RemoveResource} from './apiMain'
import { getUser } from "../Auth/apiAuth"
import {getUserDetails,profile} from './apiMain'


const Profile = (props) =>{
    const [login,setLogin] = useState(0);
    const [data,setData] = useState({})
    const [dis,setDis]=useState(true)
    const [values, setValues] = useState({
      name: "",
      email: "",
      github: "",
      linkedin: "",
      contact: "",
    });
    const [changed,setChanged]=useState(0);
    const [have,setHave]=useState([]);
    const [gain,setGain]=useState([]);
    const [resc,setResc]=useState([]);

    useEffect(async ()=>{
        await getUser().then(async (data)=>{
          let email=data.data.tokenuser.email
          const resl=await profile({"email":email})
          setData(resl[0].user)
          setHave(resl[0].have)
          setGain(resl[0].gain)
          setResc(resl[0].resource)
          values.name=resl[0].user.name
          values.email=resl[0].user.email
          values.github=(resl[0].user.github === undefined)?"":resl[0].user.github
          values.contact=(resl[0].user.contact === undefined)?"":resl[0].user.contact
          values.linkedin=(resl[0].user.linkedin === undefined)?"":resl[0].user.linkedin
          setLogin(1)
        })
        .catch((err)=>{
            setLogin(2)
        })
    },[changed])


    
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        await updateprofile(values).then((resl)=>{
            setChanged(changed+1)
            setDis(true)
            console.log(resl)
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    const handleEdit = (event)=>{
        setDis(false)
    }

    const onHaveRemove = (event,val)=>{
        let data={
          branch:val.Branch,
          skills:[val.Topic]
        }
        Removemyskills(data).then((resl)=>{
          console.log(resl)
          setChanged(changed+1)
          setDis(true)
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    const onGiveRemove= (event,val)=>{
        let data={
          branch:val.Branch,
          skills:[val.Topic]
        }
        Removeforskills(data).then((resl)=>{
          console.log(resl)
          setChanged(changed+1)
          setDis(true)
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    const onRescRemove=(event,val)=>{
        let data={
          "id":val._id
        }
        RemoveResource(data).then((resl)=>{
          console.log(resl)
          setChanged(changed+1)
          setDis(true)
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    if(login === 0){
        return (<h1>loading </h1>)
    }
    else if(login === 1){
      
      return (
        <div>
        <MainNav/>
      <div className="container">
        <Button variant="success" className="my-3" onClick={(e)=>handleEdit(e)}>Edit</Button>
        <Form className="my-2" onSubmit={(e)=>handleSubmit(e)}>
          <Form.Group controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name"  name="name" value={values.name} onChange={(e)=>handleChange(e)} disabled={dis}/>
          </Form.Group>
          <Form.Group controlId="formGroupEmail" className="my-5">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={values.email} onChange={(e) => handleChange(e)} disabled="true"/>
          </Form.Group>
          <Form.Group controlId="formGroupgithub" className="my-5">
            <Form.Label>GitHub Username</Form.Label>
            <Form.Control type="text" placeholder="Github username (optional)" name="github" value={values.github} onChange={(e) => handleChange(e)} disabled={dis}/>
          </Form.Group>
          <Form.Group controlId="formGrouplinkedin" className="my-5">
            <Form.Label>Linkedin Username</Form.Label>
            <Form.Control type="text" placeholder="Linkedin username (optional)" name="linkedin" value={values.linkedin} onChange={(e) => handleChange(e)} disabled={dis}/>
          </Form.Group>
          <Form.Group controlId="formGroupcontact" className="my-5">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text" placeholder="Contact Number" name="contact" value={values.contact} onChange={(e) => handleChange(e)} disabled={dis}/>
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3" disabled={dis}>
            Update
          </Button>
        </Form>
      </div>
      <br></br>
      <br></br>
      <hr></hr>
        <div className="container">
           <h4>skills you have</h4>
           <hr></hr>
            <div className="row">
                {have.map((val,key)=>{
                  return (
                    <div>
                      <div className="col-md-4">
                          <Card style={{ width: '15rem' }}>
                            <Card.Body>
                              <Card.Title>{val.Branch}</Card.Title>
                              <Card.Text>
                                <strong>Topic:  </strong>{val.Topic}
                              </Card.Text>
                              <Link  className="btn btn-primary" to={{pathname:"/skill/"+val._id}}>Explore</Link>
                              <Button className="btn btn-danger ml-2" onClick={(e)=>onHaveRemove(e,val)}>Delete</Button>
                            </Card.Body>
                          </Card>
                          <br></br>
                      </div>
                    </div>
                  );
                })}
            </div>
            <br></br>
            <br></br>
            <h4>Skills you want to Gain</h4>
            <hr></hr>
            <div className="row">
              {gain.map((val,key)=>{
                  return (
                    <div>
                      <div className="col-md-4">
                          <Card style={{ width: '15rem' }}>
                            <Card.Body>
                              <Card.Title>{val.Branch}</Card.Title>
                              <Card.Text>
                                <strong>Topic:  </strong>{val.Topic}
                              </Card.Text>
                              <Link  className="btn btn-primary" to={{pathname:"/skill/"+val._id}}>Explore</Link>
                              <Button className="btn btn-danger ml-2" onClick={(e)=>onGiveRemove(e,val)}>Delete</Button>
                            </Card.Body>
                          </Card>
                          <br></br>
                      </div>
                    </div>
                  );
                })}
            </div>
            <br></br>
            <br></br>
            <h4>Resources that you have created.</h4>
            <hr></hr>
            <div className="row">
                {resc.map((val,key)=>{
                  return(
                    <div>
                      <div className="col-md-4">
                          <Card style={{ width: '15rem' }}>
                            <Card.Body>
                              <Card.Title>{val.title}</Card.Title>
                              <Link className="btn btn-primary " to={{pathname:"/resource/"+val._id}}>See More..</Link>
                              <Button className="btn btn-danger ml-2" onClick={(e)=>onRescRemove(e,val)}>Delete</Button>
                            </Card.Body>
                          </Card>
                          <br></br>
                      </div>
                    </div>
                  )
                })}
            </div>

        </div>
        </div>
      )
    }
    else{
       return ( <Redirect to="/login"></Redirect> )
    }
        
}

export default Profile