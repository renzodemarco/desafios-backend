import { Router } from 'express'

const loggerRouter = Router()

loggerRouter.get('/', (req, res) => {
    req.logger.HTTP('Registro de evento HTTP')
    req.logger.INFO('Registro de evento INFO')
    req.logger.WARNING('Registro de evento WARNING')
    req.logger.ERROR('Registro de evento ERROR')
    req.logger.FATAL('Registro de evento FATAL')
    res.send({loggers: true})
})

export default loggerRouter