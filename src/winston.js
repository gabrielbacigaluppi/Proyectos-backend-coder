import winston from "winston";
import config from "./config/config.js";

// const logger = winston.createLogger({
// 	transports: [
// 		new winston.transports.Console({
// 			level: "http"
// 		})
// 		,
// 		new winston.transports.File({
// 			filename: './error.log',
// 			level: 'warn'
// 		})]
// })

// export const addLogger = (req, res, next) => {
// 	req.logger = logger
// 	req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
// 	next()
// }



// export const addLogger = winston.createLogger({
// 	transports: [
// 		new winston.transports.Console({
// 			level: "http",
// 			format: winston.format.combine(
// 				winston.format.colorize(),
// 				winston.format.simple()
// 			),
// 		}),
// 		new winston.transports.File({
// 			filename: "./logs-file.log",
// 			level: "warn",
// 			format: winston.format.combine(
// 				winston.format.timestamp(),
// 				winston.format.prettyPrint()
// 			),
// 		}),
// 	],
// });

const customeLevel = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		http: 4,
		debug: 5
	},
	colors: {
		fatal: "red",
		error: "black",
		warning: "yellow",
		info: "blue",
		http: "green",
		debug: "white"
	},
};



export let addLogger;

if (config.environment === "Production") {
	addLogger = winston.createLogger({
		levels: customeLevel.levels,
		transports: [
			new winston.transports.File({
				filename: "./errors.log",
				level: "error",
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.prettyPrint()
				),
			}),
			new winston.transports.Console({
				level: "info",
				format: winston.format.combine(
					winston.format.colorize({ colors: customeLevel.colors }),
					winston.format.simple()
				),
			}),
			
		],
	});
} else if (config.environment === "Development") {
	addLogger = winston.createLogger({
		levels: customeLevel.levels,
		transports: [
			new winston.transports.Console({
				level: "debug",
				format: winston.format.combine(
					winston.format.colorize({ colors: customeLevel.colors }),
					winston.format.simple()
				),
			}),
		],
	});
} else {
	addLogger = winston.createLogger({
		levels: customeLevel.levels,
		transports: [
			new winston.transports.Console({
				level: "debug",
				format: winston.format.combine(
					winston.format.simple()
				),
			}),
		],
	});
}
