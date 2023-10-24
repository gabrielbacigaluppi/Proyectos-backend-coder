import { cartsModel } from "../dao/models/carts.model.js";
import BasicManager from "./BasicManager.js";

class CartsManager extends BasicManager {
    constructor() {
        super(cartsModel);
    }
    async findById(id) {
        const cart = await cartsModel.findById(id).populate("products.product_id");
        return cart;
    }

    async removeProductFromCart(cartId, productId) {
        const updatedCart = await cartsModel.findOneAndUpdate(
            { _id: cartId },
            {
                $pull: { products: { product_id: productId } },
            },
            { new: true }
        );
        return updatedCart;
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        const updatedCart = await cartsModel.findOneAndUpdate(
            { _id: cartId, "products.product_id": productId },
            {
                $set: { "products.$.quantity": newQuantity },
            },
            { new: true }
        );
        return updatedCart;
    }

}

export const cartsManager = new CartsManager();
