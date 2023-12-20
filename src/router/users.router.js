import { Router } from "express";
import { usersManager } from "../dao/mongo/usersManager.js";
import { compareData, hashData } from "../utils.js";
import passport from "passport";

const router = Router();

// signup - login - passport

router.post("/signup", passport.authenticate("signup", {
	successRedirect: "/api/login",
	failureRedirect: "/api/signup",
}))
router.post("/login",
	passport.authenticate("login", { failureRedirect: "/api/login", }),
	function (req, res) {
		console.log(req.user);
		req.session["email"] = req.user.email;
		req.session["first_name"] = req.user.first_name;
		req.session["last_name"] = req.user.last_name;
		req.session.isAdmin = req.user.isAdmin;
		res.redirect("/api/products",)
	}

)

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
	passport.authenticate("github", {failureRedirect: "/error"}),
	async (req, res) => {
		req.session.user = req.user;
		res.redirect("/api/products");
	}
);


export default router;
