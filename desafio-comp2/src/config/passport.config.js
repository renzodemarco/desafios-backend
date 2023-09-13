import passport from 'passport'
import local from 'passport-local'
import UserManager from '../dao/mongo/userManager.js'
import GithubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import cookieExtractor from '../utils/cookie.extractor.js'
import { SECRET } from '../utils/jwt.js'

const manager = new UserManager()

const initPassportStrategy = () => { 

// * JWT
    passport.use('current', new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET
    },
    async (payload, done)=> {
        try {
            if (payload.email === 'admincoder@coder.com') {
                return done(null, { first_name: 'Admin', last_name: 'Coder', role: 'admin' })
            }
            const user = await manager.getUserById(payload.sub)
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
                const user = await manager.crearUser({
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
                const user = await manager.validarUser(email, password)
                return done(null, user)
            }
            catch(error) {
                return done(error)
            } 
        }
    ))

// * Login con GitHub
    passport.use('github', new GithubStrategy(
        {
            clientID: 'Iv1.f5767c1d761e2b30',
            clientSecret: '9ce48fb9d61025e2506e676f1bbcdeb805ed8c71',
            callbackURL: "http://localhost:8080/auth/github/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile._json.email
            
            const user = await manager.getUserByEmail(email)

            if (user) return done(null, user)

            const newUser = await manager.crearUser({
                first_name: profile._json.name, 
                last_name: '',
                email,
                password: ''
            })

            return done(null, newUser)
        }
    ))

// * Serialize
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

// * Deserialize
    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await manager.getUserById(_id)
            done(null, user)
        }
        catch(error) {
            done(error)
        }
    })
}

export default initPassportStrategy