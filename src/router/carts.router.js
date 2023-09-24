import { Router } from "express";
import cartsManager from '../CartManager.js'

const router = Router()

router.get("/:idCart", async(req, res) => {
    const { idCart } = req.params;
    try{
        const cart = await cartsManager.getCartById(+idCart)
        if(!cart){
            res.status(400).json({message:'Cart not found with the id sent'})
        }else{
            res.status(200).json({message:'Cart found', cart})
        }
    }catch(error){
        res.status(500).json({message:error})
    }

});

router.post('/', async (req,res)=> {
    // req.body
    try{
        const newCart = await cartsManager.addCart(req.body)
        res.status(200).json({message:'Cart created', cart: newCart})
    }catch(error){
        res.status(500).json({message:error})
    }
})

router.post('/:idCart/:idProduct', async (req,res)=> {
    const newProduct = req.body
    const { idCart,idProduct } = req.params;
    try{
        const newCart = await cartsManager.addProductInCartbyId(+idCart,+idProduct,newProduct)
        res.status(200).json({message:'Product added', cart: newCart})
    }catch(error){
        res.status(500).json({message:error})
    }
})


export default router