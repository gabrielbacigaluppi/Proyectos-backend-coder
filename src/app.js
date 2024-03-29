import express from 'express';
import productsRouter from './router/products.router.js';
import cartRouter from './router/carts.router.js';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from "socket.io";
import viewsRouter from "./router/views.router.js"
import usersRouter from "./router/users.router.js"
import "./config/configDB.js"
import { messagesManager } from './dao/mongo/messagesManager.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import './passport.js'
import sessionsRouter from "./router/sessions.router.js"
import config from "./config/config.js"
import messagesRouter from './router/messages.router.js'
import { errorMiddleware } from './errors/error.middleware.js';

import swaggerUi from "swagger-ui-express";
import { swaggerSetup } from "./swaggerSpecs.js";


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));

app.use(cookieParser())

//Session con mongo
const URI = config.mongo_uri
app.use(session({
    secret: config.mongo_secret,
    cookie: {
        maxAge: 60 * 60 * 1000
    },

    store: new mongoStore({
        mongoUrl: URI,
    }),
}))


//Handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


//Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
app.use('/api', viewsRouter)
app.use('/api/message', messagesRouter)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

//Errors
app.use(errorMiddleware)

//Passport 
app.use(passport.initialize())
app.use(passport.session())


const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
})

// websocket - server
const socketServer = new Server(httpServer)

// const products = [];
socketServer.on("connection", (socket) => {
    console.log("Cliente conectado");
    //Manejo de productos en vivo
    socket.on("newProduct", (info) => {
        socketServer.emit('productAdded', info);
    });

    socket.on("deleteProduct", (id) => {
        socketServer.emit("productDeleted", id);
    });

    //Manejo de usuarios en vivo para chat
    socket.on("newUser", (user) => {
        socket.broadcast.emit("newUserBroadcast", user)
    })

    socket.on('message', async info => {
        await messagesManager.createOne(info)
        socketServer.emit('chat', info)
    })

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});
