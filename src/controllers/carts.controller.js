import {
    findById,
    createOne,
    deleteOne,
    removeProductFromCart,
    updateOne,
    updateProductQuantity,
    purchaseCart
} from "../services/carts.service.js"

import { ErrorMessages } from "../errors/error.enum.js";
import CustomeError from "../errors/custom.error.js";

export const findCartById = async (req, res) => {
    const { idCart } = req.params;
    try {
        const cart = await findById(idCart)
        res.render("carts", { productsArray: cart.products })
        // res.status(200).json({message:'Cart found', cart})

    } catch (error) {
        // CustomeError.createError(ErrorMessages.CART_NOT_FOUND)
        res.status(500).json({ message: error })
    }

};

export const createCart = async (req, res) => {
    try {
        const newCart = await createOne(req.body)
        res.status(200).json({ message: 'Cart created', cart: newCart })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const addProductToCart = async (req, res) => {
    const newProduct = req.body
    const { idCart, idProduct } = req.params;
    try {
        const newCart = await createOne(idCart, idProduct, newProduct)
        res.status(200).json({ message: 'Product added', cart: newCart })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteCartById = async (req, res) => {
    const { idCart } = req.params
    try {
        const response = await deleteOne(idCart)
        res.status(200).json({ message: 'Cart deleted', respuesta: response })
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

export const removeProduct = async (req, res) => {
    const { idCart, idProduct } = req.params
    try {
        const response = await removeProductFromCart(idCart, idProduct)
        res.status(200).json({ message: 'Product deleted from cart', respuesta: response })
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateCart = async (req, res) => {
    const { idCart } = req.params
    const products = req.body
    try {
        const response = await updateOne(idCart, products)
        res.status(200).json({ message: 'Cart updated', respuesta: response })
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateProdQuant = async (req, res) => {
    const { idCart, idProduct } = req.params
    const newQuantity = req.body.quantity
    try {
        const response = await updateProductQuantity(idCart, idProduct, newQuantity)
        res.status(200).json({ message: 'Product updated from cart', respuesta: response })
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}
export const purchCart = async (req, res) => {
    const { idCart, idProduct } = req.params
    const newQuantity = req.body.quantity
    try {
        const response = await purchaseCart()
        res.status(200).json({ message: 'Cart purchased', respuesta: response })
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

