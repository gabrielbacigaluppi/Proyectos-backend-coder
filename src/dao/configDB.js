import mongoose from "mongoose";
const URI =
  "mongodb+srv://gabibaci:Z51SLqUXRCEbx71l@cluster0.v4xsmky.mongodb.net/ecommerce";

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));

