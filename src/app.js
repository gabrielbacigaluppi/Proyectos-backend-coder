import express from 'express';
import productsRouter from './router/products.router.js';
import cartRouter from './router/carts.router.js';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from "socket.io";
import viewsRouter from "./router/views.router.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"));

//handlebars
app.engine("handlebars",engine());
app.set("views", __dirname +"/views");
app.set("view engine", "handlebars");


//Routes
app.use('/api/products',productsRouter)
app.use('/api/carts',cartRouter)
app.use('/api',viewsRouter)


const PORT = 8080;
const httpServer = app.listen(PORT, ()=>{
    console.log(`Escuchando el puerto ${PORT}`);
})

// websocket - server
const socketServer = new Server(httpServer)

// const products = [];
socketServer.on("connection", (socket) => {
    console.log("Cliente conectado");
    socket.on("newProduct", (info) => {
        socketServer.emit('productAdded', info);
    });

    // socket.on("productsGet", (info) => {
    //     // Emitir un evento a todos los clientes conectados para notificar la adición de un producto
    //     console.log(products);
    //     products.push(info)
    //     console.log(products);
    //     socketServer.emit('productAdded', info);
    // });

    socket.on("deleteProduct", (id) => {
        socketServer.emit("productDeleted",id);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});