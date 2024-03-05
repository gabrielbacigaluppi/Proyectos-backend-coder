import jwt from "jsonwebtoken"
import config from "../config/config.js";
import { transporter } from "../nodemailer.js";

// const JWT_SECRET = "jwtSECRET";
const JWT_SECRET = config.jwt_key

export const jwtValidation = (req, res, next) =>{
    try{
        console.log(req.authorization);
        const authHeader = req.get("Authorization")
        const token = authHeader.split(" ")[1]
        const responseToken= jwt.verify(token, JWT_SECRET)
        req.user = responseToken
        next()
    }
    catch (error){
        res.status(403).json({error: "Not authorized"})
    }
}

export const sendPasswordResetEmail = async (userEmail) => {
    const token = jwt.sign({ email: userEmail }, JWT_SECRET, { expiresIn: '1h' });
// revisar la jwt secret para mi es tipo {clave:valor}
    const resetLink = `http://localhost:8080/api/users/reset-password/${token}`;

    const mailOptions = {
        from: "juangaba1998@gmail.com",
        to: userEmail,
        subject: 'Restablecer contraseña',
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${resetLink}">${resetLink}</a></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado');
    } catch (error) {
        console.error('Error al enviar el correo', error);
    }
};