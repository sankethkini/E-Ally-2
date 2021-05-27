const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Resource = require('./Resource');

const Skillschema = new Schema({
    Branch: {
        type: String
    },
    Topic: {
        type: String,
        unique: true
    },
    gainedby:
        [
            {
                type: mongoose.Types.ObjectId
            }
        ],
    requiredby:
        [
            {
                type: mongoose.Types.ObjectId
            }
        ],
    resource:[
        {
            type:mongoose.Types.ObjectId
        } 
    ]    
})


module.exports = mongoose.model('Skill', Skillschema);
