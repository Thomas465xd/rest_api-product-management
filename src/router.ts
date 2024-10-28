import { Router } from "express"
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, updateProductAvailability } from "./handers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         availability:
 *           type: boolean
 *           description: The availability of the product
 *       example:
 *         id: 1
 *         name: Test Product
 *         price: 100
 *         availability: true
 * 
 *     ProductUpdate:
 *       type: object
 *       description: An empty object to indicate optional fields for updating a product
 *       example: {}
 * 
 *     ErrorId:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error message for product ID issues
 *       example:
 *         error: "Product not found"
 * 
 *     ErrorURL:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of error
 *               value:
 *                 type: string
 *                 description: The invalid value causing the error
 *               msg:
 *                 type: string
 *                 description: The error message describing the issue
 *               path:
 *                 type: string
 *                 description: The path or field related to the error
 *               location:
 *                 type: string
 *                 description: The location in which the error occurred (e.g., 'params')
 *       example:
 *         errors: 
 *           - type: "field"
 *             value: "not-valid-url"
 *             msg: "Id must be a positive integer"
 *             path: "id"
 *             location: "params"
 * 
 *     DeleteMessage:
 *       type: object
 *       properties:
 *         data:
 *           type: string
 *           description: The message describing the deletion
 *       example:
 *         data: "Product deleted"
 */



/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Returns the list of all products
 *          tags: [Products]
 *          description: Returns the list of all products
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Returns a single product
 *          tags: [Products]
 *          description: Returns a single product based on it's id
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *                description: Numeric ID of the product to get
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: The product was not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorId'
 *              400:
 *                  description: Bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorURL'
 */

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags: [Products]
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              name:
 *                                   type: string
 *                                   description: The name of the product
 *                              price:
 *                                   type: number
 *                                   description: The price of the product
 *                              availability:
 *                                   type: boolean
 *                                   description: The availability of the product
 *                          example:
 *                              name: Test Product
 *                              price: 100
 *                              availability: true
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: Product Created succesfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid input data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorURL'
 */

/** 
 * @swagger
 * /api/products/{id}:
 *      put: 
 *          summary: Updates a product based on user input
 *          tags: [Products]
 *          description: Returns the updated product
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *                description: Numeric ID of the product to update
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid ID or Invalid input data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorURL'
 *              404:
 *                  description: The product was not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorId'
 */

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Updates the product availability
 *          tags: [Products]
 *          description: Returns the updated product availability
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *                description: Numeric ID of the product to update
 *          responses:
 *              200:
 *                  description: Succesful response - Availability updated
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ProductUpdate'
 *              400:
 *                  description: Bad request - Invalid ID
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorURL'   
 *              404:
 *                  description: The product was not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorId'    
 */

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product based on it's id
 *          tags: [Products]
 *          description: Returns a message that the product was deleted
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:   
 *                  type: integer
 *                required: true
 *                description: Numeric ID of the product to delete
 *          responses:
 *              200:
 *                  description: Succesful response - Product deleted
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DeleteMessage'
 *              400:
 *                  description: Bad request - Invalid ID
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorURL'
 *              404:
 *                  description: The product was not found
 *                  content:    
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorId'
 */

// Routing

// GET all products
router.get("/", 

    getProducts
)

// GET one product
router.get("/:id", 

    // Validación
    param("id")
        .isInt({ min: 1 }).withMessage("Id must be a positive integer"),
    handleInputErrors,
    getProductById
)

// Create a new product
router.post("/", 

    //Validación
    body("name")
        .notEmpty().withMessage("Name of the product is required"),
    body("price")
        .notEmpty().withMessage("Price of the product is required")
        .isNumeric().withMessage("Price must be a number")
        .custom(value => value > 0).withMessage("Price must be greater than 0"),
    handleInputErrors,
    createProduct
)

// Update a product
router.put("/:id", 

    // Validación
    param("id")
        .isInt({ min: 1 }).withMessage("Id must be a positive integer"),
    body("name")
        .notEmpty().withMessage("Name of the product is required"),
    body("price")
        .notEmpty().withMessage("Price of the product is required")
        .isNumeric().withMessage("Price must be a number")
        .custom(value => value > 0).withMessage("Price must be greater than 0"),
    body("availability")
        .isBoolean().withMessage("Availability must be a boolean"),
    handleInputErrors,
    updateProduct
)

// Update availability
router.patch("/:id", 

    // Validación
    param("id")
        .isInt({ min: 1 }).withMessage("Id must be a positive integer"),
    handleInputErrors,
    updateProductAvailability
)

// Delete a product
router.delete("/:id", 

    // Validación
    param("id")
        .isInt({ min: 1 }).withMessage("Id must be a positive integer"),
    handleInputErrors,
    deleteProduct
)

export default router