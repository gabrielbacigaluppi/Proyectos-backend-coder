import { Router } from "express";
// import productsManager from '../ProductManager.js'
import {findAllProducts,findProduct,createProduct,updateProduct,deleteProduct} from "../controllers/products.controller.js"
import { fakeProducts } from "../mocking.js";

const router = Router()

/* router.get('/', async (req,res)=>{
    const {limit} = req.query

    try{
        const products = await productsManager.getProducts(limit)
        if(!products.length){
            res.status(200).json({message: 'No products found'})
        }else{
            res.status(200).json({message:'Products found', products})
        }
    }catch(error){
        res.status(500).json({message:error})  
    }
})
router.get("/:idProduct", async(req, res) => {
    const { idProduct } = req.params;
    try{
        const product = await productsManager.getProductById(+idProduct)
        if(!product){
            res.status(400).json({message:'Product not found with the id sent'})
        }else{
            res.status(200).json({message:'Product found', product})
        }
    }catch(error){
        res.status(500).json({message:error})
    }

});

router.post('/', async (req,res)=> {
    // req.body
    try{
        const newProduct = await productsManager.addProduct(req.body)
        res.status(200).json({message:'Product created', product: newProduct})
    }catch(error){
        res.status(500).json({message:error})
    }
})

router.put('/:idProduct', async(req,res)=>{
    const {idProduct}= req.params
    const updatedProduct = req.body
    console.log(idProduct);
    console.log(updatedProduct);
    try{
        console.log('llegue');
        const response = await productsManager.updateProduct(+idProduct,updatedProduct)
        console.log('llegue2');
        if(response === -1){
            res.status(400).json({message:'Product not found with the id sent'})
        }
        else{
            res.status(200).json({message:'Product updated'})
        }
    }
    catch(error){
        res.status(500).json({message:error})
    }
})

router.delete('/:idProduct', async(req,res)=>{
    const {idProduct}= req.params
    try{
        const response = await productsManager.deleteProduct(+idProduct)
        if(response === -1){
            res.status(400).json({message:'Product not found with the id sent'})
        }
        else{
            res.status(200).json({message:'Product deleted'})
        }
    }
    catch(error){
        res.status(500).json({message:error})
    }
}) */

router.get('/', findAllProducts)
router.get('/mockingproducts',fakeProducts)
router.get("/:idProduct", findProduct);
router.post('/', createProduct)
router.put('/:idProduct', updateProduct)
router.delete('/:idProduct', deleteProduct)


export default router