const express = require('express')
const userController = require('../controllers/userController')
const { body, validationResult } = require('express-validator');
const Router = express.Router();
const auth=require("../middleware/auth")



Router.post('/login',[
    body('email').isEmail(),
],
userController.login)

Router.post('/signup',[
    
    body('email').isEmail(),
    body('password').isLength({min:6})
],
userController.signup)

Router.get('/getuser',
userController.getUser)

Router.post('/addmyskills',auth,userController.addmyskills)
Router.post('/askforskills',auth,userController.askforskills)
Router.post('/getuserdetails',userController.userDetails)
Router.put('/removemyskills',auth,userController.removemyskills)
Router.put('/removeforskills',auth,userController.removeforskills)
Router.post('/profile',userController.profile)
Router.put('/update',auth,userController.update)


module.exports=Router;