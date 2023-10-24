import { Router } from "express";
// import cartsManager from '../CartManager.js'
import { cartsManager } from "../managers/cartsManager.js";

const router = Router()

router.get("/:idCart", async(req, res) => {
    const { idCart } = req.params;
    try{
        const cart = await cartsManager.findById(idCart)
        res.status(200).json({message:'Cart found', cart})
        // res.render("products")
    }catch(error){
        res.status(500).json({message:error})
    }

});

router.post('/', async (req,res)=> {
    // req.body
    try{
        const newCart = await cartsManager.createOne(req.body)
        res.status(200).json({message:'Cart created', cart: newCart})
    }catch(error){
        res.status(500).json({message:error})
    }
})

router.post('/:idCart/:idProduct', async (req,res)=> {
    const newProduct = req.body
    const { idCart,idProduct } = req.params;
    try{
        const newCart = await cartsManager.createOne(idCart,idProduct,newProduct)
        res.status(200).json({message:'Product added', cart: newCart})
    }catch(error){
        res.status(500).json({message:error})
    }
})

router.delete('/:idCart', async(req,res)=>{
    const {idCart}= req.params
    try{
        const response = await cartsManager.deleteOne(idCart)
        res.status(200).json({message:'Cart deleted', respuesta: response})
    }
    catch(error){
        res.status(500).json({message:error})
    }
})

router.delete('/:idCart/products/:idProduct', async(req,res)=>{
    const {idCart, idProduct}= req.params
    try{
        const response = await cartsManager.removeProductFromCart(idCart,idProduct)
        res.status(200).json({message:'Product deleted from cart', respuesta: response})
    }
    catch(error){
        res.status(500).json({message:error})
    }
})

router.put('/:idCart', async(req,res)=>{
    const {idCart}= req.params
    const products = req.body
    try{
        const response = await cartsManager.updateOne(idCart,products)
        res.status(200).json({message:'Cart updated', respuesta: response})
    }
    catch(error){
        res.status(500).json({message:error})
    }
})


router.put('/:idCart/products/:idProduct', async(req,res)=>{
    const {idCart, idProduct}= req.params
    const newQuantity = req.body.quantity
    try{
        const response = await cartsManager.updateProductQuantity(idCart,idProduct,newQuantity)
        res.status(200).json({message:'Product updated from cart', respuesta: response})
    }
    catch(error){
        res.status(500).json({message:error})
    }
})




export default router