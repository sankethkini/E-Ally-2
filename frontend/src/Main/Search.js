import {React,useState,useEffect} from "react"
import MainNav from "../Main/MainNav"
import {search} from './apiMain'
import { Link } from "react-router-dom"
import { Button, Nav, Navbar, Carousel } from "react-bootstrap";
import Cards from '../Main/Cards'

const Search = (props)=>{
    const [searchexp,setSearchexp]=useState("");
    const [count,setCount]=useState(0);
    const [rels,setRels]=useState([[],[],[]]);
    const [isuser,setIsuser]=useState(false);
    const [isskill,setIsskill]=useState(false);
    const [isrsc,setIsrsc]=useState(false);
    const [users,setUsers]=useState([]);
    const [resources,setResources]=useState([]);
    const [skills,setSkills]=useState([]);

    const handleChange = (event)=>{
        setSearchexp(event.target.value)
    }
    const handleSubmit = async (event)=>{
        
        event.preventDefault();
        try{
            var query=props.location.onprops.query
        }
        catch(err){
            var query=searchexp;
        }
        let data=await search(query);
        setRels(data)
        setCount(count+1)
    } 
    useEffect(()=>{
       
        const fetch=async ()=>{
            try{
                var query=props.location.onprops.query
            }
            catch(err){
                var query=searchexp;
            }
            let data=await search(query);
            setRels(data)
            if(count>0){

                if(rels[0].users.length>0){
                    setIsuser(true)
                    setUsers(rels[0].users)
                }
                else
                setIsuser(false)
                if(rels[0].resources.length>0){
                    setIsrsc(true)
                    setResources(rels[0].resources)
                }
                else
                setIsrsc(false)
                if(rels[0].skills.length>0){
                    setIsskill(true)
                    setSkills(rels[0].skills)
                }
                else
                    setIsskill(false)
            }
            console.log(rels)
        }
        fetch();
    },[count]) 
    
    return(
        <div>
            <div>
                <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item active" style={{backgroundColor:"#323ea8"}}>
                            <Link className="nav-link" to={{pathname:"/branch",onprops:{option:"selectskills"}}}>+ required skills</Link>
                        </li>
                        <li className="nav-item active ml-3" style={{backgroundColor:"#323ea8"}}>
                        <Link className="nav-link" to={{pathname:"/branch",onprops:{option:"askforskills"}}}>+ add my skills</Link>
                        </li>
                        <li className="nav-item active ml-3" style={{backgroundColor:"#323ea8"}}>
                        <Link className="nav-link" to={{pathname:"/branch",onprops:{option:"contribute"}}}>+ contribute</Link>
                        </li>
                        </ul>
                    </div>
                    <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" value={searchexp} onChange={(e)=>handleChange(e)}/>
                    {/* <Link className="btn btn-outline-success my-2 my-sm-0" to={{pathname:"/search",onprops:{query:searchexp}}}>Search</Link> */}
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e)=>{handleSubmit(e)}}>search</button>
                    </form>
                    <p className="nav-link"></p>
                    <Link className="btn btn-success my-2 my-sm-0" to={{pathname:"/myprofile"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                    < path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>Profile</Link>
                    <li className="nav-item active mr-auto">
                    <button className="btn btn-primary my-2 ml-3 my-sm-0">Logout</button>
                    </li>
                    </nav>
            </div>

            <div className="container">
                <h2>Results ... </h2>
                <br></br>
                <hr></hr>
                <div className="users" style={{display:isuser?"":"none"}}>
                <h2>users</h2>
                    <div className="row">
                        <br></br>
                        
                        {users.map((val,key)=>{
                             return (
                                <div className="col-md-4">
                                  <Cards data={val} key={key} type="user"/>
                                  <br></br>
                                </div>
                            )
                        })}
                    </div>
                    <hr></hr>
                </div>
                <div className="rscs" style={{display:isrsc?"":"none"}}>
                    <h2>Resources</h2>
                    <div className="row">
                        <br></br>
                        {resources.map((val,key)=>{
                            return(
                              <div className="col-md-4">
                                  <Cards data={val} key={key} type="resc"/>
                                  <br></br>
                              </div>
                            )
                        })}
                    </div>
                    <hr></hr>
                </div>
                <div className="skls" style={{display:isskill?"":"none"}}>
                    <h2>skills</h2>
                    <div className="row">
                        <br></br>
                        {skills.map((val,key)=>{
                           return(
                               <div className="col-md-4">
                                   <Cards data={val} key={key} type="skills"/>
                                   <br></br>
                               </div>
                           )
                        })}
                    </div>
                    <hr></hr>
                </div>
                
            </div>
        </div>
    )
}

export default Search;