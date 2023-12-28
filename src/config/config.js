import dotenv from 'dotenv'
import program from '../commander.js'

// console.log(process.env);
const mode = program.opts().mode
//Si no especifico lo de adentro de los () de config buscara el .env por default
dotenv.config({
    path: mode === 'dev' ?
        '.env.development' :
        mode === 'test' ?
            '.env.testing' :
            '.env.production'
})


const obj = {
    mongo_uri: process.env.MONGO_URI,
    mongo_secret: process.env.MONGO_SECRET,
    port: process.env.PORT,
    jwt_key: process.env.JWT_SECRET_KEY,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    persistence: process.env.PERSISTENCE,
    google_app_key: process.env.GOOGLE_APP_KEY,
    google_app_user: process.env.GOOGLE_APP_MAIL,
    twilio_whatsapp_number: process.env.TWILIO_NUMBER,
    twilio_account_sid: process.env.TWILIO_SID,
    twilio_auth_token:process.env.TWILIO_TOKEN,
    environment: process.env.ENVIRONMENT
}

// console.log(obj);
export default obj