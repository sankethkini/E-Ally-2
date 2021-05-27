
import axios from 'axios'


export const relatedUser = () =>{
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.get('http://localhost:4000/skill/relatedusers',config).then((data)=>{
       return([data.data,data.data.status])
    })
    .catch((err)=>{
        
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const getUserDetails = (data) =>{
    return axios.post('http://localhost:4000/user/getuserdetails',data).then((data)=>{
        console.log(data)
       return([data.data.user,data.status])
    })
    .catch((err)=>{
        
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const addResources = (data) =>{
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.post('http://localhost:4000/resource/addresource',data,config).then((data)=>{
        console.log(data)
        return([data.data.resl,data.status])
    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const search = (data) =>{
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.get('http://localhost:4000/skill/search?query='+data,config).then((data)=>{
        return([data.data.resl,data.status])
    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const getResc = (data)=>{
    return axios.post('http://localhost:4000/resource/get',data).then((data)=>{
        console.log(data)
       return([data.data.rsc,data.status])
    })
    .catch((err)=>{
        
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const getSkills = (data)=>{
    return axios.post('http://localhost:4000/skill/get',data).then((data)=>{
        console.log(data)
       return([data.data.skls,data.status])
    })
    .catch((err)=>{
        
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const exploreSkills = (data)=>{
    
    return axios.post('http://localhost:4000/skill/exploreSkill',data).then((data)=>{
        return([data.data,data.status])
    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const profile = (data)=>{
    return axios.post('http://localhost:4000/user/profile',data).then((data)=>{
        console.log(data)
        return([data.data,data.status])
    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const updateprofile = (data)=>{
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.put('http://localhost:4000/user/update',data,config).then((data)=>{
        console.log(data)
        return([data.data.message,data.status])
    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const Removemyskills = (data)=>{
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.put('http://localhost:4000/user/removemyskills',data,config).then((data)=>{
        console.log(data)
        return([data.data.message,data.status])
    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const Removeforskills = (data) =>{
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.put('http://localhost:4000/user/removeforskills',data,config).then((data)=>{
        console.log(data)
        return([data.data.message,data.status])
    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
}

export const RemoveResource = (data)=>{
    let config={
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
    return axios.put('http://localhost:4000/resource/delete',data,config).then((data)=>{
        console.log(data)
        return([data.data.message,data.status])
    })
    .catch((err)=>{
        console.log(err)
        return ([err.response.data.message,err.request.status])
    })
} 