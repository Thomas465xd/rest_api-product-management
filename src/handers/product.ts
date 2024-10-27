import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) : Promise<void> => {
    try {
        const products = await Product.findAll()
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req: Request, res: Response) : Promise<void> => {

    try {
        // const product = Product.create(req.body)
        const product = new Product(req.body)
        const savedProduct = await product.save() 
        
        res.json({data: savedProduct})
        // res.json({data: product})
    } catch (error) {
        console.log(error)
    }
} 