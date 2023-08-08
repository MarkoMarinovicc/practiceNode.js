const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  ime: String,
  nadimak: {
    type: String,
    uniqe: true,
    required: true,
    minLength: 3,
    maxLength:25,
  },
  passwordHash: String,
  proizvod:{type:mongoose.Schema.Types.ObjectId, ref:'Proizvod'}
});
userSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._v
        delete returnedObject.passwordHash
        delete returnedObject._id
    },
})
userSchema.plugin(uniqueValidator)

const User=mongoose.model("User",userSchema)
module.exports=User