import nodemailer from "nodemailer";
import config from "./config/config.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.google_app_user,
    pass: config.google_app_key,
  },
});
