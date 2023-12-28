import { cartsManager } from "../dao/mongo/cartsManager.js";

export const findById = (id) => {
    const cart = cartsManager.findById(id)
    return cart
}

export const createOne = (obj) => {
    const createdCart = cartsManager.createOne(obj)
    return createdCart
}

export const deleteOne = (idCart) => {
    const deletedCart = cartsManager.deleteOne(idCart)
    return deletedCart
}

export const removeProductFromCart = (idCart,idProduct) => {
    const removedProduct = cartsManager.removeProductFromCart(idCart,idProduct)
    return removedProduct
}

export const updateOne = (idCart,products) => {
    const updatedCart = cartsManager.updateOne(idCart,products)
    return updatedCart
}

export const updateProductQuantity = (idCart,idProduct,newQuantity) => {
    const updatedQuantity = cartsManager.updateProductQuantity(idCart,idProduct,newQuantity)
    return updatedQuantity
}

