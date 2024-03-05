import {
    findById,
    createOne,
    deleteOne,
    removeProductFromCart,
    updateOne,
    updateProductQuantity
} from "../services/carts.service.js"
import { ErrorMessages } from "../errors/error.enum.js";
import CustomeError from "../errors/custom.error.js";
import { findById as findProductById, updateOne as updateProduct } from "../services/products.service.js";
import { newTicket } from "../services/tickets.service.js";

export const findCartById = async (req, res, next) => {
    const { idCart } = req.params;
    try {
        const cart = await findById(idCart)
        res.render("carts", { productsArray: cart.products })
        // res.status(200).json({message:'Cart found', cart})

    } catch (error) {
        // res.status(500).json({ message: error })      
        next(CustomeError.createError(ErrorMessages.CART_NOT_FOUND));
    }


};

export const createCart = async (req, res, next) => {
    try {
        const newCart = await createOne(req.body)
        res.status(200).json({ message: 'Cart created', cart: newCart })
    } catch (error) {
        // res.status(500).json({ message: error })
        next(CustomeError.createError(ErrorMessages.CART_NOT_CREATED));
    }
}

/// REVISAR ESTOO, EL AGREGADO DE PRODUCTO A CART NO ESTA BIEN, CAMBIAR POR OTRA EL CREATEONE
export const addProductToCart = async (req, res, next) => {
    const {quantity} = req.body
    const { idCart, idProduct } = req.params;

    let cart = await findById(idCart);
    if (!cart) {
        throw new Error('Cart not found');
    }

    try {
        // Verificar si el producto ya existe en el carrito
        const existingProductIndex = cart.products.findIndex(product => product.product_id.toString() === productId);
        const newCart = await updateProductQuantity(idCart, idProduct, quantity)
        res.status(200).json({ message: 'Product added', cart: newCart })
    } catch (error) {
        res.status(500).json({ message: error })
        // next(CustomeError.createError(ErrorMessages.PRODUCT_NOT_ADDED));
    }
}

export const deleteCartById = async (req, res, next) => {
    const { idCart } = req.params
    try {
        const response = await deleteOne(idCart)
        res.status(200).json({ message: 'Cart deleted', respuesta: response })
    }
    catch (error) {
        // res.status(500).json({ message: error })
        next(CustomeError.createError(ErrorMessages.CART_NOT_DELETED));
    }
}

export const removeProduct = async (req, res, next) => {
    const { idCart, idProduct } = req.params
    try {
        const response = await removeProductFromCart(idCart, idProduct)
        res.status(200).json({ message: 'Product deleted from cart', respuesta: response })
    }
    catch (error) {
        // res.status(500).json({ message: error })
        next(CustomeError.createError(ErrorMessages.PRODUCT_NOT_REMOVED));
    }
}

export const updateCart = async (req, res, next) => {
    const { idCart } = req.params
    const products = req.body
    try {
        const response = await updateOne(idCart, products)
        res.status(200).json({ message: 'Cart updated', respuesta: response })
    }
    catch (error) {
        // res.status(500).json({ message: error })
        next(CustomeError.createError(ErrorMessages.CART_NOT_UPDATED));
    }
}

export const updateProdQuant = async (req, res, next) => {
    const { idCart, idProduct } = req.params
    const newQuantity = req.body.quantity
    try {
        const response = await updateProductQuantity(idCart, idProduct, newQuantity)
        res.status(200).json({ message: 'Product updated from cart', respuesta: response })
    }
    catch (error) {
        // res.status(500).json({ message: error })
        next(CustomeError.createError(ErrorMessages.QUANTITY_NOT_UPDATED));
    }
}

export const purchaseCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;


        const cart = await findById(idCart);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const productsToUpdate = [];
        let totalAmount = 0 
        // Verificar el stock de cada producto en el carrito
        for (const item of cart.products) {
            const product = await findProductById(item.product_id);
            // console.log(item.product_id._id.toString());

            if (!product) {
                return res.status(404).json({ error: `Producto con ID ${item.product_id} no encontrado` });
            }

            if (product.stock >= item.quantity) {
                // Restar la cantidad del producto del stock
                console.log(item.product_id.price);
                totalAmount = totalAmount + item.quantity * item.product_id.price
                product.stock -= item.quantity;
                productsToUpdate.push(product);
                // Si llegue aca quiere decir que tengo que sacar este producto del carrito porque se pudo comprar
                removeProductFromCart(idCart,item.product_id)
            }
        }
        // Actualizar el stock de los productos que sí se pudieron comprar
        productsToUpdate.map(async (product) => await updateProduct(product._id, product));

        // Paso a generar el ticket con el total de la compra
        newTicket({amount: totalAmount, purchaser: "juangaba@live.com.ar"})

        // IMPORTANTEE: TERMINAR DE LINKEAR BIEN EL MAIL DE USUARIO AL TICKET Y BORRAR EL CARRITO SI SE VACIA COMPLETAMENTE. TAMBIEN DEVOLVER UN ARREGLO DE LOS PRODUCTOS NO PROCESADOS SI NO SE FINALZA LA COMPRA(ESTO ULTIMO VERIFICAR PORQUE MEPA QUE NO TIENE SENTIDO)

        res.status(200).json({ message: 'Compra finalizada exitosamente' });
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}