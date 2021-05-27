import {React,useEffect,useState} from "react"
import {} from "react-bootstrap"
import {exploreSkills,getSkills} from './apiMain'
import Cards from './Cards'
import MainNav from './MainNav'

const Skills = (props)=>{
    const [skl,setSkl]=useState({})
    const [isuser,setIsuser]=useState(false);
    const [isrsc,setIsrsc]=useState(false);
    const [users,setUsers]=useState([]);
    const [resources,setResources]=useState([]);

    useEffect(async ()=>{
        let id=props.location.pathname.split('/skill/')[1]
        console.log(id)
        await getSkills({"id":[id]}).then((resl)=>{
            try{
                let data=resl[0][0]
                setSkl(data)
            }
            catch{

            }
        })
        .catch((err)=>{console.log(err)})

        await exploreSkills({"id":id}).then((resl)=>{
            let data=resl[0]
            if(data.users.length>0){
                setIsuser(true)
                setUsers(data.users)
            }
            if(data.resources.length>0){
                setIsrsc(true)
                setResources(data.resources)
            }

        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return(
        <div>
        <MainNav/>
        <div className="container">
            <br></br>
            <br></br>
            <h2>{skl.Branch}</h2>
            <hr></hr>
            <h3>{skl.Topic}</h3>
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
        </div>
        </div>
    )

}

export default Skills;