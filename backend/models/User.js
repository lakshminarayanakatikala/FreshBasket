import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type : String , required : true},
    email:{type : String , required : true , unique : true},
    password:{type : String , required : true},
    cartItems:{type : Object , default : {}},
},{minimize : false})  
// If you don’t set this (or minimize is true, which is the default) —
// Mongoose will automatically remove empty objects before saving

const User = mongoose.models.user || mongoose.model('user' , userSchema)

export default User