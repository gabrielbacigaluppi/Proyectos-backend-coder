import mongoose, { Schema, model } from "mongoose";

//Crear el esquema
const cartsSchema = new Schema({
  products: [
    {
      product_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

//Crear el modelo/col
export const cartsModel = model("Carts", cartsSchema);
