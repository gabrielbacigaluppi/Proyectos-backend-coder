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
    purchaseCart
} from "../controllers/carts.controller.js"
import {authMiddlewareAdmin, authMiddlewareUser} from '../middlewares/auth.middleware.js'

const router = Router()

router.get("/:idCart", findCartById);
router.post('/', createCart)
router.post('/:idCart/:idProduct',authMiddlewareUser, addProductToCart)
router.delete('/:idCart', deleteCartById)
router.delete('/:idCart/products/:idProduct', removeProduct)
router.put('/:idCart', updateCart)
router.put('/:idCart/products/:idProduct', updateProdQuant)
router.put('/:idCart/purchase', purchaseCart)

// IMPORTANTEEE
// Incluir el agregado de productos a carrito por el usuario, solo este puede hacerlo, usar el authMiddlewareUser

export default router