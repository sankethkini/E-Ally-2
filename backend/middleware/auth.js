const jwt=require('jsonwebtoken');

const secret="abcd"
const auth = (req,res,next)=>{
    let t=req.headers.authorization.split(' ')[1]
    
    jwt.verify(t,secret,(err,user)=>{
        if(!err){
            req.user=user;
            next();
        }
        else{
            let er = new Error()
            er.status=401;
            er.message="the token not authenticated please login"
            next(er)
        }
    })
   
}   
module.exports=auth;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbnVzZXIiOnsiZW1haWwiOiJhYmNkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJGREc3NRQldBcjF1M2hUdlhZR2ZkM2VaeXFmeVVpOWZ0a1Mvci5mUlNWdzBUVFNnWDN2SVJPIn0sImlhdCI6MTYxMjAyOTk2M30.dHY_YPj1caPrRtA5iBfmeZRY3h2s1duKM-rB080CJXA