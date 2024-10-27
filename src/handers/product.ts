import { Request, Response } from "express";
import Product from "../models/Product.model";

// GET all Products
export const getProducts = async (req: Request, res: Response) : Promise<void> => {
    try {
        const products = await Product.findAll({
            /*
            order: [
                ['id', 'ASC']
            ], 
            limit: 10
            */
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

// GET one Product by it's id
export const getProductById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({error: 'Product not found'})
            return
        }

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

// Create a product
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

// Update a product based on it's id
export const updateProduct = async (req: Request, res: Response) : Promise<void> => {
    try {

        // Validate that the product exists
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({error: 'Product not found'})
            return
        }

        // Update
        await product.update(req.body)
        await product.save()

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

// Update availability of the product
export const updateProductAvailability = async (req: Request, res: Response) : Promise<void> => {
    try {

        // Validate that the product exists
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({error: 'Product not found'})
            return
        }

        // Update
        product.availability = !product.dataValues.availability
        await product.save()

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

// Delete a product based on it's id
export const deleteProduct = async (req: Request, res: Response) : Promise<void> => {
    try {

        // Validate that the product exists
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({error: 'Product not found'})
            return
        }

        // Delete
        await product.destroy()

        res.json({data: "Product deleted"})
    } catch (error) {
        console.log(error)
    }
}