import { Router } from "express";
import passport from "passport";
import { sendPasswordResetEmail } from "../middlewares/jwt.middleware.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken"
import { updatePasswordMongo } from "../controllers/users.controller.js";

const JWT_SECRET = config.jwt_key

const  router = Router();

// signup - login - passport


// A diferencia de los otros Routers, aca uso passport. ver el archivo passport.js donde se hacen la parte logica de login y signup
router.post("/signup", passport.authenticate("signup", {
	successRedirect: "/api/login",
	failureRedirect: "/api/signup",
}))
router.post("/login",
	passport.authenticate("login", { failureRedirect: "/api/login", }),
	function (req, res) {
		// console.log(req.user);
		req.session["email"] = req.user.email;
		req.session["first_name"] = req.user.first_name;
		req.session["last_name"] = req.user.last_name;
		req.session.isAdmin = req.user.isAdmin;
		res.redirect("/api/products",)
	}

)

router.get("/current", (req, res) => {
	// console.log(req.session)
	res.send({user: req.session.email, admin: req.session.isAdmin})
})

router.get("/logout", (req, res) => {
	req.session.destroy(() => {
		res.redirect('/api/login')
	})
})

router.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
	"/githubcallback",
	passport.authenticate("github", { failureRedirect: "/error" }),
	async (req, res) => {
		req.session.user = req.user;
		res.redirect("/api/products");
	}
);

//Ruta para solicitar mail con reseteo de psw
router.post('/forgot-password', async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ error: 'El correo electrónico es requerido' });
	}

	// Aquí puedes verificar si el correo existe en tu base de datos antes de enviar el correo

	await sendPasswordResetEmail(email);

	res.json({ message: 'Correo enviado para restablecer la contraseña' });
});

// Ruta para manejar el restablecimiento de contraseña
router.get('/reset-password/:token', async (req, res,next) => {
	const { token } = req.params;
	// console.log(token);

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(400).json({ error: 'Token inválido o vencido' });
		}

		req.body.email = decoded.email
		req.body.newPassword = "1234"
		updatePasswordMongo(req,res,next)
	});
});

export default router;
