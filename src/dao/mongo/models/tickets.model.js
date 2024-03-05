import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code:{
        type:String,
        default: function() {
            // Generar código único
            return Math.random().toString(36).substring(2, 10).toUpperCase();
        },
        unique:true,
    },
    purchase_datetime:{
        type: Date, // Cambiado a Date
        default: Date.now // Establecerá la fecha y hora actual por defecto
    },
    amount:{
        type:Number,
        required: true,
    },
    purchaser: 
        {
            email: {
                type: mongoose.SchemaTypes.ObjectId,
                ref:"users"
            },
        },
        

})

export const ticketsModel = mongoose.model("Ticket", ticketSchema)