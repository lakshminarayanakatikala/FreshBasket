import Order from "../models/Order.js"
import Product from "../models/product.js"
import Stripe from "stripe"
import User from "../models/User.js"


//place order COD : /api/order/cod
export const placeOrderCOD = async(req,res)=>{
    try {
        const {  items , address} = req.body
        const userId = req.user.id
        if(!address || items.length === 0){
         return res.json({success : false , message : "Invalid Data"})
        }

        // Validate stock
        // for (let item of items) {
        //     const product = await Product.findById(item.product);
        //     if (!product) {
        //         return res.json({ success: false, message: `Product not found!` });
        //     }
        //     if (product.isStock === false) {
        //         return res.json({ success: false, message: `${product.name} is out of stock!` });
        //     }
        // }

     //************************************/
        //calculate amount using items
        // let amount = await items.reduce(async (acc,item)=>{
        //     const product  = await Product.findById(item.product)
        //     return (await acc) + product.offerPrice * item.quantity;
        // },0)

        //add tac charge 2%
        // amount += Math.floor(amount * 0.02);

     //************************************/
        const amountArray = await Promise.all(
            items.map(async item => {
                const product = await Product.findById(item.product);
                return product.offerPrice * item.quantity;
            })
        );
        let amount = amountArray.reduce((acc, val) => acc + val, 0);
        amount += Math.floor(amount * 0.02);
        

        let order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType : 'COD'
        })

       return res.json({success : true , message : "Order Placed Successfully" , order : order})


    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})  
    }
}



//place order ONLINE /stripe : /api/order/stripe
export const placeOrderStripe = async(req,res)=>{
    try {
        const {  items , address} = req.body
        const userId = req.user.id
        const {origin} = req.headers;

        if(!address || items.length === 0){
         return res.json({success : false , message : "Invalid Data"})
        }


        // Validate stock
        // for (let item of items) {
        //     const product = await Product.findById(item.product);
        //     if (!product) {
        //         return res.json({ success: false, message: `Product not found!` });
        //     }
        //     if (product.isStock === false) {
        //         return res.json({ success: false, message: `${product.name} is out of stock!` });
        //     }
        // }


        let productData = []

    

        //calculate amount using items


        // let amount = await items.reduce(async (acc,item)=>{
        //     const product  = await Product.findById(item.product)
        //     // if (!product){
        //     //     // continue
        //     // } 
        //     productData.push({
        //         name:product.name,
        //         price : product.offerPrice,
        //         quantity : item.quantity
        //     })
        //     return (await acc) + product.offerPrice * item.quantity;
        // },0)

        // //add tac charge 2%
        // amount += Math.floor(amount * 0.02);

        const amountArray = await Promise.all(
            items.map(async item => {
                const product = await Product.findById(item.product);
                productData.push({
                    name:product.name,
                    price : product.offerPrice,
                    quantity : item.quantity
                })
                return product.offerPrice * item.quantity;
            })
        );
        let amount = amountArray.reduce((acc, val) => acc + val, 0);
        amount += Math.floor(amount * 0.02);
        

       let order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType : 'Online'
        })

        //Stripe Gateway Initialize

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

        //create line items for stripe 

        const line_items = productData.map((item)=>{
                return{
                    price_data :{
                        currency :"usd", //change to india
                        product_data:{
                            name:item.name,
                        },
                        unit_amount:Math.floor((item.price + item.price * 0.02) * 100)
                    },
                    quantity: item.quantity,
                }
        })

        //create session (if session was create using stripeInstance, line_items)

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode :"payment",
            success_url:`${origin}/loader?next=my-orders`,
            cancel_url :`${origin}/cart`,  //when every cancell the payment it moves cart page
            metadata:{
                orderId : order._id.toString(),
                userId,
            }
        })

       return res.json({success : true , url :session.url ,order : order});


    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})  
    }
}

//stripe webhooks to verify payments(isPaid or not) action : /stripe

// export const stripeWebhooks = async (req , res) =>{
    
//         //Stripe Gateway Initialize
//         const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

//         const sig = req.headers["stripe-signature"];
//         let event;
//         try {
//             event = stripeInstance.webhooks.constructEvent(
//                 req.body,
//                 sig,
//                 process.env.STRIPE_WEHOOK_SECRET
//             );
//         } catch (error) {
//             res.status(400).send(`webhook Error : ${error.message}`)
//         }

//         //handle the event

//         switch (event.type) {
//             case "payment_intent.succeeded":{
//                 const paymentIntent = event.data.object;
//                 const paymentIntentId = paymentIntent.id;

//                 //getting session metadata
//                 const session = await stripeInstance.checkout.sessions.list({
//                     payment_intent : paymentIntentId,            
//                 });
//                 const{orderId , userId} = session.data[0].metadata

//                 //mark payment is paid
//                 await Order.findByIdAndUpdate(orderId,{isPaid:true})
//                 //clear user cart
//                 await User.findByIdAndUpdate(userId , {cartItems : {}})
//                 break;
//                } 
//             case "payment_intent.payment_failed":{
//                 const paymentIntent = event.data.object;
//                 const paymentIntentId = paymentIntent.id;

//                 //getting session metadata
//                 const session = await stripeInstance.checkout.sessions.list({
//                     payment_intent : paymentIntentId,            
//                 });
//                 const{orderId } = session.data[0].metadata;
//                 await Order.findByIdAndUpdate(orderId)
//                 break;
//             } 
        
//             default:
//                 console.error(`Unhandled event type ${event.type}`)
//                 break;
//         }

//         res.json({received : true})

// }




//grt  orders by user Id : /api/order/user
export const getUserOrders = async (req,res)=>{

    try {
        const userId = req.user.id
        const orders = await Order.find({
            userId,
            // $or : [{paymentType : 'COD'},{isPaid: true}, { paymentType: 'Online', isPaid: true } ]
        }).populate("items.product address").sort({createdAt: -1}); //sort is used to new order goes to top (newest first) 
        res.json({success : true ,orders})
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})   
    }
}

//get all Orders (for seller / admin) : /api/order/seller

export const getAllOrders = async (req,res) => {

    try {
        const orders = await Order.find({
            // $or : [{paymentType : 'COD'} ,{ paymentType: 'Online', isPaid: true }]
        }).populate("items.product address");
        // console.log(orders)
        res.json({success : true ,orders })
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})   
    }
}