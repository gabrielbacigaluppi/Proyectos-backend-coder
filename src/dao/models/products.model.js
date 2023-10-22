import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//Crear el esquema
const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required:true,
    },
    code: {
        type: Number,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default:0,
        required:true,
    },
    category: {
        type: String,
        required:true,
    },
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = model('products',productsSchema)