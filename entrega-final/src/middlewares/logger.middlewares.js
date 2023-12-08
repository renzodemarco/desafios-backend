import config from '../config/loggers.config.js'

export default (req, res, next) => {
    req.logger = config
    req.logger.HTTP(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`)
    
    next()
}
