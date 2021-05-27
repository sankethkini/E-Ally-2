const Skill = require('../models/Skill')
const User = require('../models/User')
const Resource = require('../models/Resource');
const { JsonWebTokenError } = require('jsonwebtoken');

exports.addskill = (req,res,next)=>{
 
   let email=req.user.tokenuser.email;
   const { branch,skill } = req.body;
   let newskill = new Skill();
   newskill.Branch=branch;
   newskill.Topic=skill;
   newskill.save((err,data)=>{
      if(err){
         return next(new Error("new skill can't be added"));
      }
      else{
         res.status(200).json({"skill":data});
      }
   });
   
}

exports.takeskills = (req,res,next)=>{
   const {branch} = req.body;
   Skill.find({Branch:branch},(err,skills)=>{
      if(err){
         console.log(err)
         next(new Error("skills not fetched"));
      }
      else{
         res.status(200).json({"fetched":skills})
      }
   })
}

const extractUsers = async (gain,have)=>{
         let gainedbyusers=[]
         let requiredbyusers=[]
         await Promise.all(gain.map(async (val,key)=>{
            await Skill.findById(val,(err,skl)=>{
               if(err){
                  console.log(err)
               }
               else{
                  gainedbyusers=gainedbyusers.concat(skl.gainedby);
               }
            })
         })); 
         await Promise.all(have.map( async (val,key)=>{
            await Skill.findById(val,(err,skl)=>{
               if(err){
                  console.log(err)
               }
               else{
                  requiredbyusers=requiredbyusers.concat(skl.requiredby);
               }
            })
         }));
         resl=[gainedbyusers,requiredbyusers];
        return resl;
}

const extractSchema =async (ids) =>{

var users=[]
await Promise.all(ids.map(async (val,k)=>{
  await User.findById(val,(err,usr)=>{
     if(err){
        console.log(err)
     }
     else{
        users=users.concat([usr]);
     }
  })
      
  }));
 return users;

}

const extractResource = async(ids)=>{

   var resc=[]
   await Promise.all(ids.map(async (val,k)=>{
     await Resource.findById(val,(err,rsc)=>{
        if(err){
           console.log(err)
        }
        else{
           resc=resc.concat([rsc]);
        }
     })
         
     }));
    return resc;
   
}

exports.relatedUser =async (req,res,next)=>{
   let email=req.user.tokenuser.email;
   let gain=[]
   let have=[]
  
   let currusr;
   await User.find({email:email},async (err,usr)=>{
      if(err){
         console.log(err);
         next();
      }
      else{
         currusr=usr;
         gain=currusr[0].gain
         have=currusr[0].have
      }
   })
   let resc=[]
   await Resource.find({Type:{$in:gain}},(err,docs)=>{
      if(err){
         next(new Error('resource error'))
      }
      else{
         
         resc=resc.concat(docs)
      }
   })
   await Resource.find({Type:{$in:have}},(err,docs)=>{
      if(err){
         next(new Error('resource error'))
      }
      else{
         resc=resc.concat(docs)
      }
   })
   resl=await extractUsers(gain,have)

   const userid=await resl[0].filter(async(val)=>await resl[1].includes(val));
   const userid1=[...new Set(userid)]
   let userdata=await extractSchema(userid1);
   res.status(200).json({"resl":userdata,"resc":resc})
}

exports.search = async (req,res,next) =>{
   let expr=req.query['query']
   let users,rcrs,skls;
   await User.find({name:{$regex:'^'+expr,$options:"mi"}},(err,usr)=>{
      if(err){
         next(new Error("error while searching"))
      }
      else{
         users=usr
      }
   })
   await Resource.find({title:{$regex:expr,$options:"i"}},(err,rsc)=>{
      if(err){
         next(new Error("error while searching"))
      }
      else{
         rcrs=rsc
      }
   })
   await Skill.find({$or:[{Branch:{$regex:'^'+expr,$options:"mi"}},{Topic:{$regex:"^"+expr,$options:"mi"}}]},(err,skl)=>{
      if(err){
         next(new Error("error while searching"))
      }
      else{
         skls=skl
      }
   })
   return res.status(200).json({"resl":{
      "users":users,
      "resources":rcrs,
      "skills":skls
   }});
}

exports.exploreSkill = async (req,res,next)=>{
    let id=req.body.id
    let currskill;  
    await Skill.findById(id,(err,skl)=>{
       if(err){
         console.log(err)
         next(new Error("error not found"))
       }
       else{
         currskill=skl
       }
    })

    let totalusersids=[]
    totalusersids=currskill.gainedby
    totalusersids=totalusersids.concat(currskill.requiredby)
    let totalusers=await extractSchema(totalusersids)
    let resourceid=[];
    resourceid=currskill.resource
    let rescs=await extractResource(resourceid)
    return res.status(200).json({
       "resources":rescs,
       "users":totalusers
   })
}

exports.getskilldetails = async (req,res,next)=>{
  let id=req.body.id
  console.log(id)
   await Skill.find({_id:{$in:id}},(err,src)=>{
      if(err){
         next(new Error("error occured"))
      }
      else{
         res.status(200).json({
            "skls":src
         })
      }
   })
}