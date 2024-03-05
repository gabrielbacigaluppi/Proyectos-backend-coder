import {expect} from 'chai';
import supertest from "supertest";

// const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe("Testing Users", () => {
    it("El endpoint POST /api/users debe crear un usuario correctamente", async () => {
        const user = {
            first_name: "Juan",
            last_name: "Dominguez",
            email: "jdominguez@gmail.com",
            age: 23,
            password: "123456"
        }

        const { statusCode, ok, _body } = await requester.post('/api/users/signup').send(user)
        console.log(statusCode);
        console.log(ok);
        console.log(_body);
    })
})