import { createOne, findByEmail, updateOne } from "../services/users.service.js"
import { ErrorMessages } from "../errors/error.enum.js";
import CustomeError from "../errors/custom.error.js";
import { compareData } from "../utils.js";

// Files
export const fileUser = (req, res) => {
    const { email, password } = req.body;
    req.session["email"] = email;
    res.send("Usuario loggeado");
}

// Mongo

//Aca manejo el login de un usuario existente o no
export const logMongoUser = async (req, res, next) => {
    try {
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

    } catch (error) {
        // res.status(500).json({message:error})  
        next(CustomeError.createError(ErrorMessages.USER_NOT_LOGGED));
    }

}

//Aca manejo la creacion de un nuevo usuario
export const createMongoUser = async (req, res, next) => {
    try {
        const { password } = req.body;
        const hashedPassword = await hashData(password);
        const createdUser = await createOne({
            ...req.body,
            password: hashedPassword,
        });
        res.redirect('/api/login')
        // res.status(200).json({ message: "User created", createdUser });
    } catch (error) {
        // res.status(500).json({message:error})  
        next(CustomeError.createError(ErrorMessages.USER_NOT_CREATED));
    }
}


// Aca manejo el cambio de contraseña

export const updatePasswordMongo = async (req, res, next) => {
    try {

        const { email, newPassword } = req.body;
        let userDB = await findByEmail(email);

        if (!userDB) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Verifica si la nueva contraseña es igual a la anterior
        const isNewPasswordSameAsOld = await compareData(newPassword, userDB.password);

        if (isNewPasswordSameAsOld) {
            return res.status(400).json({ error: 'New password must be different from the old one.' });
        }
        
        const userID = userDB._id.toString()
        console.log(newPassword);
        console.log(userDB);
        userDB = {...userDB, password:newPassword}

        userDB.password = newPassword
        // await userDB.save()

        console.log(userDB);
        // Actualiza la contraseña
        await updateOne(userID,userDB)
        res.json({ message: 'Password updated successfully.' });

    } catch (error) {
        // Manejo de errores
        // res.json({message:error}) 
        // next(CustomeError.createError(ErrorMessages.PASSWORD_UPDATE_FAILED));
        console.log(error);
    }
};