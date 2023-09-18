import { Router } from 'express'
import UserManager from '../dao/mongo/user.dao.js'
import { generateToken } from '../utils/jwt.js'
import passportCall from '../utils/passport.call.js'

const apiRouter = Router()

const manager = new UserManager()

apiRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        let token = ''

        if (email === 'admincoder@coder.com' && password === 'adminCod3r123') {
            token = generateToken({ email: 'admincoder@coder.com' })
        }

        else {
            const user = await manager.validarUser(email, password)
            if (!user) return res.send({ error: true, msg:'Incorrect email or password' })
            token = generateToken({
                sub: user._id, 
                user: { first_name: user.first_name, last_name: user.last_name, role: user.role }
            })
        }

        res.cookie('accessToken', token, {
            maxAge: 1000 * (60*60),
            httpOnly: true
        })
    
        res.send({error: false, accessToken: token})
    }
    catch(e) {
        res.send({error: true, msg: e.message})
    }
})

apiRouter.get('/current', passportCall('current'), (req, res) => {
    res.send(req.user)
})


export default apiRouter