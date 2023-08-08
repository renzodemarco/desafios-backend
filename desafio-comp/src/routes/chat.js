import {Router} from 'express'
import ChatManager from '../dao/mongo/chatManager.js'

const chatRouter = Router()

const manager = new ChatManager(
)

chatRouter.get('/', async (req, res) => {
    try {
        req.io.on('connection', async socket => {
            const data = await manager.getHistory()
            socket.emit('history', data)
        })

        res.render('chat', {})
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

export default chatRouter