import { Router } from "express";
import productsManager from "../dao/memory/ProductManager.js";
import { addLogger } from "../winston.js";
// import { Server } from "socket.io";

const router = Router();
// const socketClient = new Server("http://localhost:8080");

router.get("/", async (req, res) => {
    const products = await productsManager.getProducts();
    res.render("index", { products });
});

router.get("/chat", (req, res) => {
    res.render("chat");
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await productsManager.getProducts();
    // socketClient.emit("productsGet", products);
    res.render("realTimeProducts", { products });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/home", (req, res) => {
    const { email, first_name } = req.session;
    res.render("home", { email, first_name });
});

router.get("/jwt/login", (req, res) => {
    res.render("loginjwt");
});

router.get("/jwt/signup", (req, res) => {
    res.render("signupjwt");
});


router.get('/loggerTest', (req, res) => {
	//Los siguientes son los que vienen por default
	addLogger.fatal("Fatal error");
	addLogger.error("Error");
	addLogger.warning("Warning");
	addLogger.info("Info");
	addLogger.http("http");
	addLogger.debug("Debug");
	res.send("Probando winston");
})


export default router;
