import express from "express"
import { contactUs } from "../controllers/contactController.js"

const contactRoute = express.Router()

contactRoute.post('/',contactUs)

export default contactRoute