import mongoose from "mongoose";
import config from "../config/config.js"

export let carts
export let products

switch (config.persistence) {
    case "MONGO":
        //Solo cuando la opcion sea MONGO nos interesara conectar a la base
        const connection = mongoose.connect(config.mongo_uri)
        const {default: CartsMongo} = await import("./mongo/cartsManager.js")
        const {default: ProductsMongo} = await import("./mongo/productsManager.js")

        carts = CartsMongo
        products = ProductsMongo
        break;

    case "MEMORY":
        const {default: CartsMemory} = await import("./memory/CartManager.js")
        const {default: ProductsMemory} = await import("./memory/ProductManager.js")

        carts = CartsMemory
        products = ProductsMemory
        break;
}