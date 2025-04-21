import jwt from 'jsonwebtoken'

//seller login : /api/seller/login

export const sellerLogin = async(req,res) =>{
   try {

        const {email , password} = req.body;

        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email} , process.env.JWT_SECRET ,{expiresIn:"7d"});
            res.cookie("sellerToken" , token ,{
                httpOnly : true ,         // prevent javascript to access cookies  //  The cookie can’t be accessed using JavaScript (document.cookie).   // Only the browser will send it to the server automatically.
                secure : process.env.NODE_ENV  === 'production',     // (use secure cookie in production)   NODE_ENV === "production"  --> true other wise false 
                sameSite : process.env.NODE_ENV  === 'production' ? "none" : "strict",   // it will secure on CSRF protection            
                maxAge :  7 * 24 * 60 * 60 * 1000 , //cookie expire time 7d
            }) 

            return res.json({success : true ,message : "Logged In" })
        }else{
            return res.json({success : false , message : "Invalid Credentials" })
        }
    
   } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})
   }
}


//seller Auth : /api/seller/is-auth

export const isSelletrAuth = async(req,res)=>{
    try {
        return res.json({success : true })

    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})
    }
}



//logout seller : /api/seller/logout 

export const sellerLogout = async(req,res)=>{
    try {
        res.clearCookie('sellerToken',{
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
