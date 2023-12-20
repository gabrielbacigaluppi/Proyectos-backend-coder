import passport from "passport";
import { usersManager } from "./dao/mongo/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { compareData, hashData } from "./utils.js";
import { Strategy as GitHubStrategy } from "passport-github2";
import jwt from "passport-jwt";
import config from "./config/config.js"

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const JWT_SECRET = config.jwt_key;


const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken']
    }
    return token
}


passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    // secretOrKey: 'coderSecret', ====>>> {"error":"JsonWebTokenError: invalid signature"}
    secretOrKey: JWT_SECRET,
}, async (jwt_payload, done) => {
    try {
        return done(null, jwt_payload)
    }
    catch (error) {
        return done(error)
    }
}
))


passport.use(
    "signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const userDB = await usersManager.findByEmail(email);
                if (userDB) {
                    return done(null, false);
                }
                const hashedPassword = await hashData(password);
                const createdUser = await usersManager.createOne({
                    ...req.body,
                    password: hashedPassword,
                });
                done(null, createdUser)
            }
            catch (error) {
                done(error)
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                const userDB = await usersManager.findByEmail(email);
                if (!userDB) {
                    return done(null, false);
                }
                const isValid = await compareData(password, userDB.password);
                if (!isValid) {
                    return done(null, false);
                }
                userDB.isAdmin =
                    // email === "adminCoder@coder.com" && password === "Cod3r123" ? "admin" : "user";
                    email === "adminCoder@coder.com" && password === "Cod3r123" ? true : false;

                done(null, userDB);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use('github',
    new GitHubStrategy(
        {
            clientID: config.github_client_id,
            clientSecret: config.github_client_secret,
            callbackURL: "http://localhost:8080/api/users/githubcallback",
        },
        async function (accessToken, refreshToken, profile, done) {
            
            try {
                // console.log(profile);
                const userDB = await usersManager.findByEmail(profile._json.email);
                // login
                if (userDB) {
                    if (userDB.from_github) {
                        return done(null, userDB);
                    } else {
                        return done(null, false);
                    }
                }
                // signup
                const newUser = {
                    first_name: "prueba",
                    last_name: "test",
                    email: profile._json.email,
                    password: "fekhflvlv",
                    from_github: true,
                    age: 19,
                };
                const createdUser = await usersManager.createOne(newUser);
                done(null, createdUser);
            } catch (error) {
                done(error);
            }
        }
    )
);





passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await usersManager.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
