import { Router } from 'express'
import passportCall from "../middlewares/passport.call.js";
import { isUser } from '../middlewares/auth.middlewares.js'

const chatRouter = Router()

chatRouter.get('/', passportCall('current'), isUser, (req, res) => {
    const username = req.user.first_name
    res.render('chat', {username})
})

export default chatRouter