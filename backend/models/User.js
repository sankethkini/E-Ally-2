const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Skills = require('./Skill');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    github: {
        type: String
    },
    linkedin:{
        type:String
    },
    contact:{
        type:String
    },
    rating:{
        type:Number
    },
    have:[{type:mongoose.Types.ObjectId,ref:Skills}],

    gain:[{type:mongoose.Types.ObjectId,ref:Skills}]

})

userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userSchema);

