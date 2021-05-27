const express = require('express');
const  {addskill,takeskills, relatedUser,search,exploreSkill,getskilldetails} = require('../controllers/skillController')
const Router = express.Router();
const auth = require('../middleware/auth')



Router.post('/addskills',auth,addskill)
Router.post('/takeskills',takeskills) 
Router.get('/relatedusers',auth,relatedUser)
Router.get('/search',auth,search)
Router.post('/exploreSkill',exploreSkill)
Router.post('/get',getskilldetails)

module.exports=Router;
