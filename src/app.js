import express from 'express';
import productsRouter from './router/products.router.js';
import cartRouter from './router/carts.router.js';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from "socket.io";
import viewsRouter from "./router/views.router.js"
import "./dao/configDB.js"
import { messagesManager } from './managers/messagesManager.js';

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

const messages = []
// const products = [];
socketServer.on("connection", (socket) => {
    console.log("Cliente conectado");
    //Manejo de productos en vivo
    socket.on("newProduct", (info) => {
        socketServer.emit('productAdded', info);
    });

    socket.on("deleteProduct", (id) => {
        socketServer.emit("productDeleted",id);
    });

    //Manejo de usuarios en vivo para chat
    socket.on("newUser", (user)=>{
        socket.broadcast.emit("newUserBroadcast", user)
    })

    socket.on('message', async info =>{
        await messagesManager.createOne(info)
        messages.push(info)
        socketServer.emit('chat',messages)
    })

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});