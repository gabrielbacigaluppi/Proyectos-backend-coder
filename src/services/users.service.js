import { usersManager } from "../dao/mongo/usersManager.js"


export const createOne = (obj) => {
    const createdUser = usersManager.createOne(obj)
    return createdUser
}

export const findByEmail = (email) => {
    const user = usersManager.findByEmail(email)
    return user
}

export const updateOne = (id,obj) => {
    const updatedUser = usersManager.updateOne(id,obj)
    return updatedUser
}
