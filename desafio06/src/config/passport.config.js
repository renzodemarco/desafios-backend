import passport from 'passport'
import local from 'passport-local'
import UserManager from '../dao/mongo/userManager.js'
import GithubStrategy from 'passport-github2'

const manager = new UserManager()

const initLocalStrategy = () => { 

// * Register
    passport.use('register', new local.Strategy(
        {
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            const {name, surname, email} = req.body

            try {
                const userExists = await manager.getUserByUsername(username)

                console.log(userExists)

                if (userExists) return done("Username already exists", false)
    
                const user = await manager.crearUser({name, surname, username, password, email})
    
                return done(null, user.toObject())
            }
            catch(error) {
                return done(error.message)
            }
        } 
    ))

// * Login
    passport.use('login', new local.Strategy(
        {
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const user = await manager.validarUser(username, password)
                return done(null, user)
            }
            catch(error) {
                return done(error.message, false)
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
            const username = profile._json.login
            
            const user = await manager.getUserByUsername(username)

            if (user) return done(null, user)

            const newUser = await manager.crearUser({
                name: profile._json.name, 
                surname: '', 
                username,
                email: profile._json.email,
                password: ''
            })
        }
    ))

// * Serialize
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

// * Deserialize
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await manager.getUserById(id)
            done(null, user)
        }
        catch(error) {
            done(error)
        }
    })

}

export default initLocalStrategy