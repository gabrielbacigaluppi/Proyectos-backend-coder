import { Router } from "express";
import { transporter } from "../nodemailer.js";
import { __dirname } from "../utils.js";
import { client } from "../twilio.js";
import config from "../config/config.js";
const router = Router();

router.get("/", async (req, res) => {
	const options = {
		from: "juangaba1998@gmail.com",
		to: [
			"juangaba@live.com.ar",
		],
		subject: "Mail prueba nodemailer",
		//text: "Primer mail enviado con nodemailer",
		html: "<h1>Primer h1 de prueba</h1>",
		// attachments: [{ path: __dirname + "/crypto.jpeg" }],
	};
	await transporter.sendMail(options);
	res.send("Enviando email");
});

router.post("/", async (req, res) => {
	const { message } = req.body;

	const options = {
		from: "juangaba1998@gmail.com",
		to: req.session.email,
		subject: message,
		text: `Este es un mensaje de prueba. Gracias por usar nuestro servicio ${req.session.first_name} ${req.session.last_name}`,
	};
	await transporter.sendMail(options);
	res.send("Mail enviado con exito");
});

// twilio
router.post("/twilio", async (req, res) => {
	const options = {
		body: req.body.message,
		to: "+541140692587",
		from: config.twilio_whatsapp_number,
	};
	await client.messages.create(options);
	res.send("Mensaje enviado a telefono de confianza trial +541140692587");
});
export default router;
