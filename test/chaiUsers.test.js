import { usersManager } from "../src/dao/mongo/usersManager.js";
import { expect } from "chai";
import mongoose from "mongoose";
import config from "../src/config/config.js"

const URI = config.mongo_uri



before(async function() {
    this.timeout(10000); // Ajusta el tiempo de espera si es necesario
    await mongoose.connect(URI);
    console.log("Conectado a la base de datos");
});
describe("Get users", function(){
    it("should return a full array", async function(){
        const result = await usersManager.findAll()
        expect(result).to.be.an("array")
    })
    // it("should return 0 users", async function(){
    //     const result = await usersManager.findAll()
    //     expect(result).to.have.lengthOf(0)
    // })
})

describe("Create users", function() {

    after(async function(){
        const userToDelete = await usersManager.findByEmail("jdominguez@gmail.com")
        console.log(userToDelete)
        await usersManager.deleteOne(userToDelete._id)
    })

    it("should create the user", async function(){
        const user = {
            first_name : "Juan",
            last_name : "Dominguez",
            email: "jdominguez@gmail.com",
            age:23,
            password: "123456"
        }

        const response = await usersManager.createOne(user)
        expect(response).to.have.property("_id")
    })
})