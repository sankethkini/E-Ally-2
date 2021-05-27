import { React,useEffect,useState } from "react";
import { Form, Button,Alert, FormControl,FormLabel,FormGroup } from "react-bootstrap";
import { addskill,takeskills} from '../Skills/apiSkills';
import { addResources } from "../Main/apiMain"
import { Redirect } from 'react-router-dom';
import MainNav from "./MainNav";

const AddResource = (props)=>{
  
   
    const [values, setValues] = useState([]);
    const [sub, setSub] = useState(false);
    const [adddsp,setAdddsp] = useState(false);
    const [newskill,setNewskill] = useState("");
    const [login,setLogin] = useState(1);
    const [skills,setSkills] = useState([]);
    const [load,setLoad] = useState(0);
    const [popup,setPopup] = useState("")
    const [count,setCount] = useState(0);
    const [main,setMain]=useState({
        title:"",
        body:""
    })
   useEffect(()=>{
        let pt= props.location.pathname;
        let branch=pt.split("/")[1]
        let data={
            "branch":branch
        }
        console.log(data)
        takeskills(data).then((dt)=>{
           
            setSkills(dt[0])
            setLoad(1)
        })
        .catch((err)=>{
            setLoad(0)
        })
   },[count])
    const onChange = async (event) => {
        let skills = new Set(values)

        skills.add(event.target.value)

        let toadd = []
        skills.forEach((idx, val) => {
            toadd.push(val)
        })
        setValues(toadd)
        if (toadd.length >= 1) {
            setSub(true)
        }
        else {
            setSub(false)
        }
    }
    const removeItem = (event, index) => {
        let skills = new Array()
        skills.push(...values)
        skills.splice(index, 1)
        setValues(skills)
        if (skills.length >= 1) {
            setSub(true)
        }
        else {
            setSub(false)
        }
    }
    const submitHandler =async (event) => {
        event.preventDefault()
        let pt= props.location.pathname;
        let branch=pt.split("/")[1]
        let data={
            "title":main.title,
            "body":main.body,
            "branch":branch,
            "skills":values
        }
       await addResources(data).then((resp)=>{
        let message=resp[0]
        let code=resp[1]
        if(code===401){
            setLogin(0);
        }
        else if(code===200){
            setPopup("success")
            console.log(message)
        }
        else{
            setPopup("failed")
        }
      })
      .catch((err)=>{
        console.log(err)
      })
       
        
    }
    const skillSubmitHandler = async (event)=>{
        event.preventDefault();
        let pt= props.location.pathname;
        let branch=pt.split("/")[1]
        
        let data={
            "title":main.title,
            "body":main.body,
            "branch":branch,
            "skill":newskill
        }
        await addskill(data).then((resp)=>{
            let message=resp[0]
            let code=resp[1]
            if(code===401){
                setLogin(0);
            }
            else if(code===200){
                setPopup("success")
                console.log(message)
                setCount(count+1)
            }
            else{
                setPopup("failed")
            }
          })
          .catch((err)=>{
            console.log(err)
          })
        
    }
    const skillChangeHandler = (event)=>{
        setNewskill(event.target.value)
    }
    const bodyChangeHandler = (event)=>{
        setMain({...main,[event.target.name]:event.target.value})
    }

    var Popup=(<h1></h1>);
    if(popup==="success"){
        Popup=(<Alert className="alert alert-success">{popup}</Alert>);
    }
    if(popup==="failed"){
        Popup=(<Alert className="alert alert-danger">{popup}</Alert>);
    }
    if(login){
        if(!load){
            return <h1>Loading ..</h1>
        }
        else{
    return (
        <div>
            <MainNav/>
        <div className="container my-5">
            <h3>Here You Can Select Topics</h3>
            <div>
               {Popup}
            </div>
            <div className="row my-5">
                <div className="col-md-9 col-sm-9">
                    {/* <Form.Group controlId="seldskill">
                           <Form.Label>selected skills</Form.Label>
                           <Form.Control type="text" name="seldskills" value={values} style={{"font-family":"cursive"}}></Form.Control>
                       </Form.Group> */}
                    <ul className="tags">
                        {values.map((val, i) => { return <li key={i} className="tag" onClick={(e) => removeItem(e, i)}>{val}</li> })}
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">


                    <Form>
                        <Form.Group controlId="selskill" className="my-5">
                            <Form.Label>Select Skills</Form.Label>
                            <Form.Control as="select" onChange={(e) => onChange(e)} name="selskill">
                                {skills.map((val,i)=>{
                                    return <option key={i} value={val.Topic}>{val.Topic}</option>
                                })}                               
                                <h2></h2>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>

                <div className="col-md-6 my-5 " style={{ textAlign: "end" }}>

                    <h4> Add A New Skill Here.</h4>
                    <br></br>
                    <br></br>
                    <button className="btn btn-primary" onClick={(e)=>{setAdddsp(true)}}>+ add</button>
                    <small className="ml-2">( first try to find in available )</small>
                    <br></br>
                    <br></br>

                    <div style={{display:adddsp?"":"none"}} className="ml-5 my-5">
                       <Form onSubmit={(e)=>{skillSubmitHandler(e)}}>
                           <Form.Group>
                               <Form.Label> name your skill here. </Form.Label>
                               <Form.Control type="text" onChange={(e)=>{skillChangeHandler(e)}} value={newskill}></Form.Control>
                           </Form.Group>
                           <Button type="submit" className="btn btn-primary">+</Button>
                       </Form>
                       
                    </div>
                </div>
            </div>

            <br></br>  
            <br></br>

            <h2>Your Opinion Here ... </h2>                    
           
            <div>
                <Form onSubmit={(e)=>{submitHandler(e)}}>
                    <Form.Group>
                        <FormLabel>Title</FormLabel>
                        <FormControl type="text" value={main.title} placeholder="title" name="title" onChange={(e)=>{bodyChangeHandler(e)}}></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <FormLabel>Body</FormLabel>
                        <FormControl as="textarea" value={main.body} placeholder="full explanation" name="body" rows={8} onChange={(e)=>{bodyChangeHandler(e)}}></FormControl>
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary">Add</Button>
                </Form>
            </div>
        </div>
        </div>
                    
    );
    }
}
    else{
        return (<Redirect to="/login"></Redirect>)
    }
}

export default AddResource