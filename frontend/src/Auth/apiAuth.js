const axios = require('axios')
export const signup= (details)=>{

  return axios.post('http://localhost:4000/user/signup',details).then((data)=>{
      return ([data.data.message,data.status])
   })
   .catch((err)=>{
       return([err.response.data.message,500])
   })
   
}

export const login= (details) =>{
    return axios.post('http://localhost:4000/user/login',details).then((data)=>{
        return([data.data.token,data.status])
    })
    .catch((err)=>{
        return([err.response.data.message,500])
    })
}

export const getUser = async () =>{
    const config = {
        headers: {
            authorization : localStorage.getItem('token')
        }
    };
    return axios.get('http://localhost:4000/user/getuser',config).then((data)=>{
        return(data)
    })
    .catch((err)=>{
        return err;
    })
}