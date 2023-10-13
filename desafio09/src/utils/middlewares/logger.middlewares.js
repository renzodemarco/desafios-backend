import loggerConfig from '../../config/loggers.config.js'

const HTTPDevLogger = (req, res, next) => {
    req.logger = config
    req.logger.HTTP(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`)
    return next()
}

export { HTTPDevLogger }