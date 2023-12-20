import {Schema, model} from "mongoose";

//Crear el esquema
const messagesSchema = new Schema({
    user_email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})

//Crear el modelo/col
export const messagesModel = model('messages',messagesSchema)