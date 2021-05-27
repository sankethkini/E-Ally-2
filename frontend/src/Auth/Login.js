import Nav from "./Nav";
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { login } from './apiAuth';
import { Redirect } from "react-router-dom"
import axios from "axios";

const Login = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    success: "",
    error: "",
    message: "",
    islogin:false,
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    var message, code
    await login(values).then((resp) => {
      message = resp[0]
      code = resp[1]
    })
      .catch((err) => {
        console.log(err)
      })
      if(code === 200){
        localStorage.setItem("token","Bearer "+ message)
        setValues({...values,message:"user authenticated",success:"yes",error:"",islogin:true})
       
        
      }else{
       
        setValues({...values,message:message,error:"yes",success:""})
      }
  }
  
  const LoginForm = () => (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={values.email} onChange={(e) => handleChange(e)} name="email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={values.password} onChange={(e) => handleChange(e)} name="password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log in
        </Button>
    </Form>
  );
  const successForm = () => (
    <Alert className="alert alert-success" style={{ display: values.success === "" ? "none" : "" }}>
      {values.message}
    </Alert>
  );
  const failureForm = () => (
    <Alert className="alert alert-danger" style={{ display: values.error === "" ? "none" : "" }}>
      {values.message}
    </Alert>
  );
  if(values.islogin){
    return ( <Redirect to="/main"></Redirect> );
  }else{
  return (
    <div>
      <Nav />
      <div className="container my-5">
        <h2>Log In</h2>
        <br></br>
        {successForm()}
        {failureForm()}
        {LoginForm()}
      </div>
    </div>
  );
  }
};

export default Login;
