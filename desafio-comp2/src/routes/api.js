import { Router } from 'express'
import UserManager from '../dao/mongo/userManager.js'
import { generateToken } from '../utils/jwt.js'

const apiRouter = Router()

const manager = new UserManager()

apiRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await manager.validarUser(email, password)
        if (!user) return res.send({ error: true, msg:'Incorrect email or password' })
        const token = generateToken({
            sub: user._id, 
            user: { first_name: user.first_name, last_name: user.last_name, role: user.role }
        })

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


export default apiRouter