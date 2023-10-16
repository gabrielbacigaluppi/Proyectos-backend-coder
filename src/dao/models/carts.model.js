import {Schema, model} from "mongoose";

//Crear el esquema
const cartsSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})

//Crear el modelo/col
export const cartsModel = model('carts',cartsSchema)