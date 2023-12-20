import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code:{
        type:String,
        required: true,
    },
    purchase_datetime:{
        type:String,
        required: true,
        unique:true,
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
            }
        },

})

export const ticketsModel = mongoose.model("Ticket", ticketSchema)