const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Skill = require("../models/Skill");
const Resource = require("../models/Resource");

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

let secret = "abcd"
const saltrounds = 12
exports.signup =async (req, res, next) => {
   
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var user = new User();
    let hashed;
    user.email = req.body.email;
    user.name = req.body.name;
    try{
       hashed= await bcrypt.hash(req.body.password,saltrounds)
    }
    catch(error){
        console.log(error)
        return next(new Error|('password hash error'))
    }
      
    user.password=hashed
    if (req.body.github) {
        user.gitub = req.body.github
    }
    if (req.body.linkedin) {
        user.linkedin = req.body.linkedin
    }
   
    user.save((err, user) => {
        if (err) {
            
           return res.status(500).json({
                message: "user can't be created"
            })
        }
        else {
            res.setHeader('Content-Type','application/json')
            res.status(200).json({
                message: "user created succesfuly"
            })
            return
        }
    })

}

exports.login = (req, res, next) => {
    let hash,match
    const { email, password } = req.body;
    User.find({ 'email': email }, async (err, user) => {
        if (err) {  
            console.log(err)
            return next(new Error('user not found'))
        }
        else { 
            if(user.length >0){
            const tokenuser = {email:user[0].email,password:user[0].password}
             await bcrypt.compare(password, user[0].password).then((pass)=>{
                 match=pass
             })
             .catch((err)=>{
                console.log(err)
             })
            if (!match) {
                return next(new Error('password not matched')) 
            }
            else {
                jwt.sign({ tokenuser }, secret, (err, token) => {
                    if (err) {
                        return next(new Error('tokenization error'))
                    }
                    else {
                        return res.status(200).json({"token":token})
                    }
                })
            }
        }
        else{
            return next(new Error('user not found'));
        }
        }
    })

}

exports.getUser = (req,res,next) =>{
    
    const token=req.headers['authorization'].split(' ')[1]
    jwt.verify(token,secret,(err,user)=>{
        if(err){
            next(new Error('user not verified'))
        }
        else{
            res.status(200).json(user)
        }
    })
     
}

exports.addmyskills = async (req,res,next)=>{

    let email=req.user.tokenuser.email
    const { branch , skills } = req.body
    let myskill=[]
    await Skill.find({Branch:branch,Topic:{$in:skills}},(err,skls)=>{
        if(err){
            console.log(err)
            next();
        }
        else{
           myskill=skls
        }
    })

    let curruser;
    await User.find({email:email},(err,opt)=>{
        if(err){
            console.log(err);
            next();
        }
        else{
            curruser=opt[0];
        }
    })

     skills.map( async (val,key)=>{
        
        await Skill.findOneAndUpdate({Branch:branch,Topic:val},{$addToSet:{gainedby:curruser._id}},(err,usr)=>{
            if(err){
                console.log(err)
                next();
            }
            else{

                console.log(usr);
            }
        })
    })
    
    User.findOneAndUpdate({email:email},{$addToSet:{have:myskill}},(err,opt)=>{
        if(err){
            console.log(err);
            next(new Error("skills can't be updated"))
        }
        else{
           // console.log(opt)
            res.status(200).json({"message":"skills updated","user":opt});
        }
    })
   
}

exports.askforskills = async (req,res,next)=>{
    let email=req.user.tokenuser.email
    const { branch , skills } = req.body
    let myskill=[]
    await Skill.find({Branch:branch,Topic:{$in:skills}},(err,skls)=>{
        if(err){
            console.log(err)
            next();
        }
        else{
           myskill=skls
        }
    })
    let curruser;
    await User.find({email:email},(err,opt)=>{
        if(err){
            console.log(err);
            next();
        }
        else{
            curruser=opt[0];
        }
    })

    skills.map( async (val,key)=>{
        
        await Skill.findOneAndUpdate({Branch:branch,Topic:val},{$addToSet:{requiredby:curruser._id}},(err,skl)=>{
            if(err){
                console.log(err)
                next();
            }
            else{
                console.log(skl);
            }
        })
    })
    
    User.findOneAndUpdate({email:email},{$addToSet:{gain:myskill}},(err,opt)=>{
        if(err){
            console.log(err);
            next(new Error("skills can't be updated"))
        }
        else{
           // console.log(opt)
            res.status(200).json({"message":"skills updated","user":opt});
        }
    })
   
}

exports.userDetails = async (req,res,next)=>{
    const id=req.body.id
    console.log(id)
    User.find({_id:{$in:id}},(err,usr)=>{
        if(err){
            console.log(err);
            next(new Error("user not found"));
        }
        else{
            res.status(200).json({"user":usr});
        }
    })
}

exports.removemyskills = async (req,res,next)=>{
    let email=req.user.tokenuser.email
    const { branch , skills } = req.body
    let myskill=[]
    await Skill.find({Branch:branch,Topic:{$in:skills}},(err,skls)=>{
        if(err){
            console.log(err)
            next();
        }
        else{
           myskill=skls
        }
    })
    let curruser;
    await User.find({email:email},(err,opt)=>{
        if(err){
            console.log(err);
            next();
        }
        else{
            curruser=opt;
        }
    })
    skills.map(async (val,key)=>{
        await Skill.findOneAndUpdate({Branch:branch,Topic:val},{$pull:{gainedby:curruser[0]._id}},(err,usr)=>{
            if(err){
                console.log(err)
                next();
            }
            else{
                console.log(usr);
            }
        })
    })
    User.findOneAndUpdate({email:email},{$pullAll:{have:myskill}},(err,opt)=>{
        if(err){
            console.log(err);
            next(new Error("skills can't be updated"))
        }
        else{
           // console.log(opt)
            res.status(200).json({"message":"skills updated","user":opt});
        }
    })

}

exports.removeforskills = async (req,res,next)=>{
    let email=req.user.tokenuser.email
    const { branch , skills } = req.body
    let myskill=[]
    await Skill.find({Branch:branch,Topic:{$in:skills}},(err,skls)=>{
        if(err){
            console.log(err)
            next();
        }
        else{
           myskill=skls
        }
    })
    let curruser;
    await User.find({email:email},(err,opt)=>{
        if(err){
            console.log(err);
            next();
        }
        else{
            curruser=opt;
        }
    })

    skills.map( async (val,key)=>{
        
        await Skill.findOneAndUpdate({Branch:branch,Topic:val},{$pull:{requiredby:curruser[0]._id}},(err,skl)=>{
            if(err){
                console.log(err)
                next();
            }
            else{
                console.log(skl);
            }
        })
    })
    
    User.findOneAndUpdate({email:email},{$pullAll:{gain:myskill}},(err,opt)=>{
        if(err){
            console.log(err);
            next(new Error("skills can't be updated"))
        }
        else{
           // console.log(opt)
            res.status(200).json({"message":"skills updated","user":opt});
        }
    })
}

exports.profile = async (req,res,next)=>{
    let email=req.body.email
    let details;
    await User.find({email:email},(err,doc)=>{
        if(err){
            next(new Error("no user found"))
        }
        else{
            details=doc[0]
        }
    })
    let have=details.have
    let gain=details.gain
    let havedocs,gaindocs;
    await Skill.find({_id:{$in:have}},(err,docs)=>{
        if(err){
            next(new Error("no user found"))
        }
        else{
            havedocs=docs
        }
    })
    await Skill.find({_id:{$in:gain}},(err,docs)=>{
        if(err){
            next(new Error("no user found"))
        }
        else{
            gaindocs=docs
        }
    })
    let recs=[]
    await Resource.find({owner:details._id},(err,docs)=>{
        if(err){
            next(new Error("no user found"))
        }
        else{
            recs=recs.concat(docs)
        }
    })

    return res.status(200).json({
        "user":details,
        "have":havedocs,
        "gain":gaindocs,
        "resource":recs
    })
}

exports.update = async (req,res,next)=>{
    let email=req.body.email
    let data=req.body
    await User.findOneAndUpdate({email:email},data,(err,docs)=>{
        if(err){
            next(new Error("not updated"))
        }
        else{
            return res.status(200).json({"message":"success"})
        }
    })
}