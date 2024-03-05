import { expect } from 'chai';
import supertest from "supertest";
import chaiHttp from 'chai-http';
// import app from '../src/app';  // Asegúrate de importar tu aplicación Express correctamente

const requester = supertest('http://localhost:8080')


describe('User Router Integration Tests', () => {
    // Test for user signup
    it('should signup a new user', async () => {
        const user = {
            first_name: "Juan",
            last_name: "Dominguez",
            email: "jdominguez@gmail.com",
            age: 23,
            password: "123456"
        }
        const res = await requester
          .post('/api/signup')
          .send(user);
        // const { statusCode, ok, _body } = await requester
        //     .post('/api/signup')
        //     .send(user);
        // console.log(statusCode);
        // console.log(ok);
        // console.log(_body);
        // console.log(res)
        // expect(res).to.have.status(200);
        expect(res).should.have.status(200);
        // Add more assertions as needed
    });

    // Test for user login
    it('should log in an existing user', async () => {
        const userLogin = {
            email: "jdominguez@gmail.com",
            password: "123456"
        }
        const res = await requester
            .post('/api/login')
            .send({
                userLogin
            });

        expect(res).to.have.status(200);
        // Add more assertions as needed
    });

    // Test for requesting password reset email
    //   it('should request a password reset email', async () => {
    //     const res = await chai
    //       .request(app)
    //       .post('/api/forgot-password')
    //       .send({
    //         // Provide email for password reset
    //       });

    //     expect(res).to.have.status(200);
    //     // Add more assertions as needed
    //   });

    // Test for handling password reset
    //   it('should reset the user password', async () => {
    //     // First, obtain a token (you might need to signup/login a user before)
    //     const getTokenRes = await chai
    //       .request(app)
    //       .post('/api/login')
    //       .send({
    //         // Provide login data
    //       });

    //     const token = getTokenRes.body.token;  // Assuming your login endpoint returns a token

    //     // Then, use the token to reset the password
    //     const resetPasswordRes = await chai
    //       .request(app)
    //       .get(`/api/reset-password/${token}`);

    //     expect(resetPasswordRes).to.have.status(200);
    //     // Add more assertions as needed
    //   });
});
