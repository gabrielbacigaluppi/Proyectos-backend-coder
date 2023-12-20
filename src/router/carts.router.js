import { Router } from "express";
// import cartsManager from '../CartManager.js'
import {
    findCartById,
    createCart,
    addProductToCart,
    deleteCartById,
    removeProduct,
    updateCart,
    updateProdQuant,
    purchCart
} from "../controllers/carts.controller.js"

const router = Router()

router.get("/:idCart", findCartById);
router.post('/', createCart)
router.post('/:idCart/:idProduct', addProductToCart)
router.delete('/:idCart', deleteCartById)
router.delete('/:idCart/products/:idProduct', removeProduct)
router.put('/:idCart', updateCart)
router.put('/:idCart/products/:idProduct', updateProdQuant)
router.put('/:idCart/purchase', purchCart)

export default router