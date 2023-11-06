import {dirname} from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import passport from "passport";
import local from 'passport-local';


export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashData = async(data) => {
    const hash = await bcrypt.hash(data,10)
    return hash
}

export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData)
}