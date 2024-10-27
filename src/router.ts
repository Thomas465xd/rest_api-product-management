import { Router } from "express"
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, updateProductAvailability } from "./handers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

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