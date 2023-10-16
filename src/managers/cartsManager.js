import { cartsModel } from "../dao/models/carts.model.js"
import BasicManager from "./BasicManager.js"

class CartsManager extends BasicManager{
    constructor(){
        super(cartsModel)
    }
}

export const cartsManager = new CartsManager()