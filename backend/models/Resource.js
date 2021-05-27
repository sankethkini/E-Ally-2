const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Skill = require('./Skill')


const schema= new Schema({
    title:{
        type:String,
    },
    body:{
        type:String
    },
    owner:{
        type:mongoose.Types.ObjectId
    },
    Type:[{
        type:mongoose.Types.ObjectId,
    }]
});
schema.index({owner:1})

module.exports = mongoose.model('Resource',schema);