import { Router } from "express"
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, updateProductAvailability } from "./handers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get("/", 

    getProducts
)

router.get("/:id", 

    // Validación
    param("id")
        .isInt({ min: 1 }).withMessage("Id must be a positive integer"),
    handleInputErrors,
    getProductById
)

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

router.patch("/:id", 

    // Validación
    param("id")
        .isInt({ min: 1 }).withMessage("Id must be a positive integer"),
    handleInputErrors,
    updateProductAvailability
)

router.delete("/:id", 

    // Validación
    param("id")
        .isInt({ min: 1 }).withMessage("Id must be a positive integer"),
    handleInputErrors,
    deleteProduct
)

export default router