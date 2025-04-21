import {v2 as cloudinary} from "cloudinary"
import Product from "../models/product.js"

//add Product : /app/product/add
export const addProduct = async (req,res)=>{
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        //get image url
        let imagesUrl = await Promise.all(
            images.map(async (item )=>{
                let result = await cloudinary.uploader.upload(item.path,{
                    resource_type :'image'})

                return result.secure_url
            })
        )

        await Product.create({...productData , image : imagesUrl})
        res.json({success : true , message : "Product Added"})
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }

}

// get-Product : /app/product/list (all products)
export const productList = async (req,res)=>{

    try {
        const products = await Product.find({})
        // console.log(products)
        res.json({success : true , products})
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }

}

// get single Product : /app/product/id
export const productById = async (req,res)=>{

    try {
        const {id} = req.body
        const product = await Product.findById(id)
        res.json({success : true , product})

    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
}

// get  Product inStock : /app/product/stock
export const changeStock = async (req,res)=>{
    try {
        const {id , inStock} = req.body
        await Product.findByIdAndUpdate(id,{inStock})
        res.json({success : true , message :"Stock Updated" })
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
}