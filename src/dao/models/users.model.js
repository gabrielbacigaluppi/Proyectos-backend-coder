import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required: true,
    },
    last_name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    age:{
        type:Number,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },    
    from_github: {
        type: Boolean,
        default: false,
    }
})

export const usersModel = mongoose.model("Users", userSchema)