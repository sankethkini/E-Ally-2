import axios from 'axios'


export const addskill = (data) =>{
    
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.post('http://localhost:4000/skill/addskills',data,config).then((data)=>{
        console.log(data)
        return ([data.data.message,data.status])
     })
     .catch((err)=>{
         console.log(err)
         return([err.response.data.message,err.request.status])
     })
}

export const takeskills = (data) =>{
    return axios.post('http://localhost:4000/skill/takeskills',data).then((data)=>{
        return ([data.data.fetched,data.status])
    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const addmyskills = (data) =>{
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.post('http://localhost:4000/user/addmyskills',data,config).then((data)=>{
        
        return([data.data.message,data.status])

    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}


export const askforskills = (data) =>{
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.post('http://localhost:4000/user/askforskills',data,config).then((data)=>{
        
        return([data.data.message,data.status])

    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}



