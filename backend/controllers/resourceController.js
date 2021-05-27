const Resource = require('../models/Resource');
const Skill = require('../models/Skill');
const User = require('../models/User');



exports.addResource = async (req,res,next) =>{
    email=req.user.tokenuser.email
    const  { title,body,branch,skills } = req.body
    let rsc = new Resource();
    rsc.title = title
    rsc.body = body
    let owner;
    await User.find({email:email},(err,usr)=>{
        if(err){
            console.log(err)
            next(new Error("resource can't be created"));

        }
        else{
           owner=usr[0]._id
        }
    })
  
    rsc.owner=owner
    let type;
    await Skill.find({Branch:branch,Topic:{$in:skills}},(err,skl)=>{
        if(err){
            next(new Error("not created"))
        }
        else{
            type=skl
        }
    })
    let sklls=[]
    type.map((val,key)=>{
        sklls=sklls.concat(val._id)
    })
    rsc.Type=sklls
    rsc.save();
    await sklls.map(async (val,key)=>{
        await Skill.findByIdAndUpdate(val,{$addToSet:{resource:rsc._id}},(err,sk)=>{
            if(err){
                next(new Error("sklls not updated"))
            }
            else{
                console.log(sk)
            }
        })
    })
    return res.status(200).json({
        "data":rsc
    })
}


exports.updateResource = async (req,res,next)=>{
    const id=req.params['id']
    let rscs;
    await Resource.findOneAndUpdate({_id:id},req.body,(err,rsc)=>{
        if(err){
            console.log(err)
            next(new Error("can't update"))
        }
        else{
           rscs=rsc
        }
    })
    await Resource.find({_id:id},(err,rsc)=>{
        if(err){
            console.log(err)
            next(new Error("cant update"))
        }
        else{
            rscs=rsc
        }
    })
    res.status(200).json(rscs)
}

exports.deleteResource =async (req,res,next) =>{
    const id=req.body.id
    await Resource.remove({_id:id},(err)=>{
        if(err){
            next(new Error("not able to delete"));
        }
        else{
            return res.status(200).json({"message":"deleted successfuly"});
        }
    })
}

exports.rscDetails = async (req,res,next)=>{
    let id=req.body.id
    await Resource.find({_id:{$in:id}},(err,rsc)=>{
        if(err){
            next(new Error("not found rsc"));
        }
        else{
            res.status(200).json({
                "rsc":rsc
            })
        }
    })

}