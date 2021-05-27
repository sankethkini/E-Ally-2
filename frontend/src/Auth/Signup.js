import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "./apiAuth";
import { Redirect } from "react-router-dom";
const Signup = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    contact: "",
    error: "",
    created: "",
    message: ""
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })

  }
  const handleSubmit =async (event) => {
   var message,code
    event.preventDefault();
    await signup(values).then((resp)=>{
      message=resp[0]
      code=resp[1]
     
    })
    .catch((err)=>{
      console.log(err)
    })
    
    if(code === 200){
      setValues({...values,message:message,created:"yes",error:""})
      return ( <Redirect to="/login" /> )
    }
    else{
    setValues({...values,message:message,error:"yes",created:""})
        
    }

  }
  const newForm = () => (
    <Form className="my-5" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group controlId="formGroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" value={values.name} onChange={(e) => handleChange(e)} name="name" />
      </Form.Group>
      <Form.Group controlId="formGroupEmail" className="my-5">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={values.email} onChange={(e) => handleChange(e)} />
      </Form.Group>
      <Form.Group controlId="formGroupPassword" className="my-5">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={(e) => handleChange(e)} />
      </Form.Group>
      <Form.Group controlId="formGroupgithub" className="my-5">
        <Form.Label>GitHub Username</Form.Label>
        <Form.Control type="text" placeholder="Github username (optional)" name="github" value={values.github} onChange={(e) => handleChange(e)} />
      </Form.Group>
      <Form.Group controlId="formGrouplinkedin" className="my-5">
        <Form.Label>Linkedin Username</Form.Label>
        <Form.Control type="text" placeholder="Linkedin username (optional)" name="linkedin" value={values.linkedin} onChange={(e) => handleChange(e)} />
      </Form.Group>
      <Form.Group controlId="formGroupcontact" className="my-5">
        <Form.Label>Contact</Form.Label>
        <Form.Control type="text" placeholder="Contact Number" name="contact" value={values.contact} onChange={(e) => handleChange(e)} />
      </Form.Group>
      <Button variant="primary" type="submit" className="my-3">
        Sign up
          </Button>
    </Form>
  );
  const displayError = () => (
    <Alert className="alert alert-danger" style={{ display: values.error === "" ? "none" : "" }}>
      {values.message}
    </Alert>
  )
  const displaySucess = () => (
    <Alert className="alert alert-success" style={{ display: values.created === "" ? "none" : "" }}>
      {values.message}
    </Alert>
  );
  return (
    <div>
      <Nav />

      <div className="container my-2">
        <h2>Sign Up</h2>
        <br></br>
        {displayError()}
        {displaySucess()}
        {newForm()}
       

      </div>
    </div>
  );
};

export default Signup;
