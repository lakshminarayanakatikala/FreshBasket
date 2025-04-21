import User from "../models/User.js"


//update user cartData : /api/cart/update
export const updateCart = async (req,res)=>{
    try {
        const { cartItems} = req.body //userId comes in middeleware
        const userId  = req.user.id
        await User.findByIdAndUpdate(userId , {cartItems})
        res.json({success : true , message : "Cart Updated"})
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
}