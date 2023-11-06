import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";
import { compareData, hashData } from "../utils.js";
import passport from "passport";

const router = Router();

// files
// router.post("/", (req, res) => {
//   const { email, password } = req.body;
//   req.session["email"] = email;
//   res.send("Usuario loggeado");
// });

// mongo

/* //Aca manejo el login de un usuario existente o no
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDB = await usersManager.findByEmail(email);
  //chequeo que exista el email del usuario
  if (!userDB) {
    return res.json({ error: "Wrong email or password." });
  }
  //chequeo si las contraseñas coinciden
  const comparePassword = await compareData(password, userDB.password);
  if (!comparePassword) {
    return res.json({ error: "Wrong email or password." });
  }

  req.session["email"] = email;
  req.session["first_name"] = userDB.first_name;
  req.session["isAdmin"] =
    email === "adminCoder@coder.com" && password === "Cod3r123" ? "admin" : "user";
  res.redirect("/api/products");
});

//Aca manejo la creacion de un nuevo usuario
router.post("/signup", async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashData(password);
  const createdUser = await usersManager.createOne({
    ...req.body,
    password: hashedPassword,
  });
  res.redirect('/api/login')
  // res.status(200).json({ message: "User created", createdUser });
}); */

// signup - login - passport

router.post("/signup", passport.authenticate("signup", {
  successRedirect:"/api/login",
  failureRedirect:"/api/signup",
}))
router.post("/login", passport.authenticate("login", {
  successRedirect:"/api/products",
  failureRedirect:"/api/login",
}))

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect('/api/login')
  })
})


export default router;
