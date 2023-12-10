import { usersManager } from "../dao/usersManager.js"


export const createOne = (obj) => {
    const createdProduct = usersManager.createOne(obj)
    return createdProduct
}

export const findByEmail = (email) => {
    const user = usersManager.findByEmail(email)
    return user
}

