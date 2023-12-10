import {createOne,findByEmail} from "../services/users.service.js"

// Files
export const fileUser = (req, res) => {
    const { email, password } = req.body;
    req.session["email"] = email;
    res.send("Usuario loggeado");
}

// Mongo

//Aca manejo el login de un usuario existente o no
export const logMongoUser =  async (req, res) => {
    const { email, password } = req.body;
    const userDB = await findByEmail(email);
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
}

//Aca manejo la creacion de un nuevo usuario
export const createMongoUser =  async (req, res) => {
    const { password } = req.body;
    const hashedPassword = await hashData(password);
    const createdUser = await createOne({
        ...req.body,
        password: hashedPassword,
    });
    res.redirect('/api/login')
    // res.status(200).json({ message: "User created", createdUser });
}
