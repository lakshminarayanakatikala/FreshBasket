import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{type : String ,required:true},
    useremail:{type : String ,required:true},
    message:{type : String ,required:true},
})

const Contact = mongoose.models.contact || mongoose.model("contact" , orderSchema)

export default Contact

