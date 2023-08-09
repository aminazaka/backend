const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const persons = mongoose.model('persons', new Schema(
    {
       
        'name':{type: String, required: true, lowercase: true},
         'email':{type: String, required: false, lowercase: true, unique:true},
         'password':{type:String,required:true}
   
   
    }))

  module.exports = {persons}