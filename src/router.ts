import { Router } from "express"
import { body } from "express-validator";
import { createProduct, getProducts } from "./handers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get("/", 

    getProducts
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

router.put("/", (req, res) => {
    res.json("Desde PUT")
})

router.patch("/", (req, res) => {
    res.json("Desde patch")
})

router.delete("/", (req, res) => {
    res.json("Desde delete")
})

export default router