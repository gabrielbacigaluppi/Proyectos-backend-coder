import { Router } from "express";
import { generateToken, passportCall } from "../utils.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import passport from "passport";
const router = Router()

const users = []
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    const exists = users.find(user => user.email === email)
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" })
    const user = {
        name,
        email,
        password
    }
    users.push(user)

    const access_token = generateToken(user)
    // res.send({status:"success", access_token})
    res.cookie('coderCookieToken', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ message: "User created!" })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = users.find(user => user.email === email && user.password === password)
    if (!user) return res.status(401).send({ status: "error", error: "Invalid credentials" })

    const access_token = generateToken(user)
    // res.send({status:"success", access_token})
    res.cookie('coderCookieToken', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ message: "Logged In!" })

})

// router.get("/current", jwtValidation, (req, res) => {
//     res.send({ status: "success", payload: req.user })
// })
// router.get("/current", passport.authenticate('jwt',{session:false}), (req, res) => {
//     res.send(req.user)
// })
router.get("/current", passportCall('jwt'), (req, res) => {
    // res.send({user: req.user.email, password: req.user.password})
    res.send(req.user)
})

export default router