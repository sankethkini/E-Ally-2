const express = require('express');
const Router = express.Router();
const auth = require('../middleware/auth')
const resourceController = require('../controllers/resourceController')

Router.post('/addresource',auth,resourceController.addResource)
Router.put('/update',auth,resourceController.updateResource)
Router.put('/delete',auth,resourceController.deleteResource)
Router.post('/get',resourceController.rscDetails)
module.exports = Router;