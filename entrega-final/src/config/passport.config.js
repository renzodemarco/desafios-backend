import passport from 'passport'
import local from 'passport-local'
import * as userServices from '../services/user.services.js'
import GithubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import cookieExtractor from '../utils/cookie.extractor.js'
import { SECRET } from '../utils/jwt.js'
import config from './env.config.js'

const initPassportStrategy = () => { 

// * JWT
    passport.use('current', new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET
    },
    async (payload, done)=> {
        try {
            if (payload.email === 'admincoder@coder.com' && payload.role === 'admin') {
                return done(null, { first_name: 'Admin', last_name: 'Coder', role: 'admin' })
            }
            const user = await userServices.getUserById(payload.sub)
            if (!user) return done('Incorrect email or password (JWT)')
    
            return done(null, user)
        }
        catch(error) {
            return done(error)
        }
    }))

// * Register local
    passport.use('register', new local.Strategy(
        {
            passReqToCallback: true, 
            usernameField: 'email'
        },
        async (req, email, password, done) => {
            const {first_name, last_name, age} = req.body

            try {
                const user = await userServices.createUser({
                    first_name, 
                    last_name, 
                    email, 
                    age, 
                    password,
                    role: (email === 'admincoder@coder.com' && password === 'adminCod3r123') ? 'admin' : 'user'
                })
    
                return done(null, user.toObject())
            }
            catch(error) {
                error.from = 'passport'
                return done(error)
            }
        } 
    ))

// * Login local
    passport.use('login', new local.Strategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, email, password, done) => {
            try {
                const user = await userServices.validateUser(email, password)
                if (!user) return done(error)
                return done(null, user)
            }
            catch(error) {
                error.from = 'passport'
                return done(error)
            } 
        }
    ))

// * Login con GitHub
    passport.use('github', new GithubStrategy(
        {
            clientID: 'Iv1.f5767c1d761e2b30',
            clientSecret: config.GITHUB_KEY,
            callbackURL: "http://localhost:8080/api/auth/github/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile._json.email

            try {
                const user = await userServices.getUserByEmail(email)

                return done(null, user)
            }
            catch {
                const newUser = await userServices.createUser({
                        first_name: profile._json.name, 
                        last_name: '',
                        email,
                        password: ''
                    })

                return done(null, newUser)
            }
        }
    ))

// * Serialize
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

// * Deserialize
    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userServices.getUserById(_id)
            done(null, user)
        }
        catch(error) {
            done(error)
        }
    })
}

export default initPassportStrategy