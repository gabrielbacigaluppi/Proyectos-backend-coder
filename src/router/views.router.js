import { Router } from "express";
import productsManager from '../ProductManager.js';
// import { Server } from "socket.io";


const router = Router();
// const socketClient = new Server("http://localhost:8080"); 


router.get('/', async (req,res)=>{
    const products = await productsManager.getProducts()
    res.render("index", {products});
})

router.get('/realtimeproducts', async (req,res)=>{
    const products = await productsManager.getProducts()
    // socketClient.emit("productsGet", products);
    res.render("realTimeProducts", {products});
})


export default router;