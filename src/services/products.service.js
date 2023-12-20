import {productsManager} from "../dao/mongo/productsManager.js"


export const findAll = (opt) => {
    const products = productsManager.findAll(opt)
    return products
}

export const findById = (id) => {
    const product = productsManager.findById(id)
    return product
}

export const createOne = (obj) => {
    const createdProduct = productsManager.createOne(obj)
    return createdProduct
}

export const deleteOne = (idProduct) => {
    const deletedProduct = productsManager.deleteOne(idProduct)
    return deletedProduct
}

export const updateOne = (idProduct,updatedProduct) => {
    const newProduct = productsManager.updateOne(idProduct,updatedProduct)
    return newProduct
}

