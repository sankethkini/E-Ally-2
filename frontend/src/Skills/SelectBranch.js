import React, { useState,useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"
import MainNav from '../Main/MainNav'

const SelectBranch = (props) => {
    const [opt,setOpt] = useState("selectskills");
    let data=[
               {name:"Computer Science",desc:"In this branch you'll get things related to programming and computer science related topics and technologies."},
               {name:"Commerce",desc:"In this branch you'll get things related to Accountancy,economics,business management and many more."},
               {name:"Hospitality",desc:"In this branch you'll get things related to hotel management,hospital maintainence,event management etc."},
               {name:"Agriculture",desc:"In this branch you'll get things related to farming,seed management,selling and buying crops"},
               {name:"Other",desc:"In this branch you'll get things like cooking,driving,carpentaring,electrician work,auto mobile work"}
             ]
    useEffect(()=>{
        try{
        setOpt(props.location.onprops.option)
        }
        catch{
            
        }
    })
    return (
        <div>
            <MainNav/>
        <div className="container">
            <h1>{props.location.option}</h1>
            <h2 className="my-5">Select Your Branch</h2>
            <div className="row">
                {
                data.map((val,idx)=>{return ( 
                <div className="col-md-4" key={idx}>
                    <div className="card my-3" style={{ width: "15rem"}}>
                        <img className="card-img-top" src="https://image.freepik.com/free-vector/light-blue-project-management-concept_23-2147782704.jpg"
                            alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title"><strong>{val.name}</strong></h5>
                            <p className="card-text">{val.desc}</p>
                            <Link className="btn btn-primary" to={{pathname:val.name+"/"+opt,onprops:{branch:val.name}}}>Get Into</Link>               
                        </div>
                    </div>
                </div> )})   
                }
            </div>
        </div>
        </div>

    )
}

export default SelectBranch;