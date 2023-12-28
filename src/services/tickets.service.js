import { cartsManager } from "../dao/mongo/cartsManager.js";

export const purchaseCart = (idCart) => {
    const cartPurchased = cartsManager.purchaseCart(idCart)
    return cartPurchased
}