import {React,useEffect,useState} from "react"
import { Form } from "react-bootstrap"
import {getSkills,getUserDetails,getResc} from './apiMain'
import MainNav from './MainNav'

const Resource = (props)=>{
    
const [author,setAuthor] = useState("");
const [skl,setSkl]=useState([]);
const [dat,setDat]=useState({})
const [load,setLoad]=useState(true);


useEffect(async ()=>{
  let id=props.location.pathname.split('/resource/')[1]
  await getResc({"id":[id]}).then(async (resl)=>{
        let data=resl[0][0]
        setDat(data)
        
        await getUserDetails({"id":[data.owner]}).then((resl)=>{
            console.log(resl)
            try{
                setAuthor(resl[0][0].name)
            }
            catch{

            }
        })
        .catch((err)=>{
            console.log(err)
        })
        await getSkills({"id":data.Type}).then((resl)=>{
            console.log(resl)
            try{
                setSkl(resl[0])
            }
            catch{

            }
        })
        .catch((err)=>{
            console.log(err)
        })
    setLoad(false)
  })
  .catch((err)=>{
      console.log(err)
  })
  
},[]);
   
    if(load){
        return (
            <h1>Loading</h1>
        )
    }
    else{
    return(
        <div>
        <MainNav/>
        <br></br>
        <br></br>
        <div className="container">
            <h2>{dat.title}</h2>
            <br></br>
            <hr></hr>
            <p><strong>{dat.body}</strong></p>
            <br></br>
            <hr></hr>
            <footer>
           <h4>Author</h4><p><strong>{author}</strong></p> 
            <hr></hr>
            <h4>Related with</h4>
            {skl.map((val,key)=>{
                return(
                    <li key={key}>{val.Topic}</li>
                )
            })}
            </footer>
        </div>
        </div>
    )
        }
}

export default Resource