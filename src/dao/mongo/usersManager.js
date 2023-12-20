import BasicManager from "./BasicManager.js"
import { usersModel } from "./models/users.model.js"

class UsersManager extends BasicManager{
    constructor(){
        super(usersModel)
    }
    async findByEmail(email) {
        const response = await usersModel.findOne({ email });
        return response;
    }
}

export const usersManager = new UsersManager()