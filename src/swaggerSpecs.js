import swaggerJSDOC from "swagger-jsdoc";
import { __dirname } from "./utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coder API",
      version: "1.0.0",
      description: "API para Ecommerce CH",
    },
  },
  apis: [`${__dirname}/docs/*.yaml`],
};

export const swaggerSetup = swaggerJSDOC(swaggerOptions);
