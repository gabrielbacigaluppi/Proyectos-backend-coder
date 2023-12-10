import {dirname} from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import passport from "passport";
import local from 'passport-local';
import jwt from "jsonwebtoken";
import config from "./config/config.js"

const JWT_SECRET = config.jwt_key;


export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashData = async(data) => {
    const hash = await bcrypt.hash(data,10)
    return hash
}

export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData)
}

export const generateToken = (user) =>{
    const token = jwt.sign(user, JWT_SECRET, {expiresIn:300})
    return token
}

export const passportCall = (strategy) =>{
    return async(req,res,next) => {
        passport.authenticate(strategy, function(err, user, info){
            if(err) return next(err)
            if(!user){
                return res.status(401).send({error:info.messages?info.messages:info.toString()})
            }
            req.user = user
            next()
        })(req,res,next)
    }
}