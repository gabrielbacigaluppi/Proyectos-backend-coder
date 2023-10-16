import {Schema, model} from "mongoose";

//Crear el esquema
const productsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default:0,
    },
    description: {
        type: String,
    },
})

//Crear el modelo/col
export const productsModel = model('products',productsSchema)