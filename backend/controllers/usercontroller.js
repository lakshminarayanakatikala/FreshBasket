
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js";
// import cookieParser from "cookie-parser";

//Registor user : /api/user/register
export const register = async (req,res)=>{
        console.log(req.body)
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success : false , message : 'Missing Details'})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.json({success : false , message : 'User already exists'})
        }
        const hashedPassword = await bcrypt.hash(password , 10)

        const user = await User.create({name, email , password : hashedPassword})

        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET ,{expiresIn : '7d'} );

        res.cookie("token" , token ,{
            httpOnly : true ,         // prevent javascript to access cookies  //  The cookie can’t be accessed using JavaScript (document.cookie).   // Only the browser will send it to the server automatically.
            secure : process.env.NODE_ENV  === 'production',     // (use secure cookie in production)   NODE_ENV === "production"  --> true other wise false 
            sameSite : process.env.NODE_ENV  === 'production' ? "none" : "strict",   // it will secure on CSRF protection            
            maxAge :  7 * 24 * 60 * 60 * 1000 , //cookie expire time 7d

        })

        return res.json({success : true , user : {email : user.email , name : user.name}})

    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})

    }
}


//login user : /api/user/login

export const login  = async (req,res)=>{
    try {
        const {email , password} = req.body

        if(!email || !password){
            return res.json({success : false , message : "Email and Password are required"})
        }

        const user = await User.findOne({email})

        if(!user){
            return res.json({success : false , message : "Invalid Email and Password"})
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch){
            return res.json({success : false , message : "Invalid Email and Password"})
        }

        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET ,{expiresIn : '7d'} );

        res.cookie("token" , token ,{
            httpOnly : true ,         // prevent javascript to access cookies  //  The cookie can’t be accessed using JavaScript (document.cookie).   // Only the browser will send it to the server automatically.
            secure : process.env.NODE_ENV  === 'production',     // (use secure cookie in production)   NODE_ENV === "production"  --> true other wise false 
            sameSite : process.env.NODE_ENV  === 'production' ? "none" : "strict",   // it will secure on CSRF protection            
            maxAge :  7 * 24 * 60 * 60 * 1000 , //cookie expire time 7d

        })

        return res.json({success : true ,message : "Login Successfully", user : {email : user.email , name : user.name}})


        
    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})
    }
    
}



//check Auth : /api/user/is-auth

export const isAuth = async(req,res)=>{
    try {
        // const {userId} = req.body;
        const user = await User.findById(req.user.id).select("-password") // it will excude the password (select)
        return res.json({success : true , user})

    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})
    }
}



//logout user : /api/user/logout 

export const logout = async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly : true ,         // prevent javascript to access cookies  //  The cookie can’t be accessed using JavaScript (document.cookie).   // Only the browser will send it to the server automatically.
            secure : process.env.NODE_ENV  === 'production',     // (use secure cookie in production)   NODE_ENV === "production"  --> true other wise false 
            sameSite : process.env.NODE_ENV  === 'production' ? "none" : "strict"   // it will secure on CSRF protection            
        })
        return res.json({success : true , message : "Logged Out"})


    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})     
    }
}
