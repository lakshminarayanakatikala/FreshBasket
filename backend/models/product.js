import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{type : String , required : true},
    description:{type : Array , required : true },
    price:{type : Number , required : true},
    offerPrice:{type : Number , required : true},
    image:{type : Array , required : true},
    category:{type : String , required : true},
    inStock:{type : Boolean , default : true},

},{timestamps : true})  //timestamps: true → Auto adds createdAt and updatedAt to your collection

const Product = mongoose.models.product || mongoose.model('product' , productSchema)   //check product model is there or not both conditions it will work

export default Product