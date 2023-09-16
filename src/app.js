import express from 'express';
import { productsManager } from './ProductManager.js';
import { log } from 'console';

const app = express()

app.get('/products', async (req,res)=>{
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


app.get("/products/:idProduct", async(req, res) => {
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


app.listen(8080, ()=>{
    console.log('Escuchando al puerto 8080');
})