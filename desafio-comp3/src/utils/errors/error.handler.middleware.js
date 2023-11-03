import EErrors from "./enum.errors.js";

const errorHandlerMiddleware = (error, req, res, next) => {
    switch (error.code) {
        case EErrors.ROUTING_ERROR:
            return res.status(404).send({error: true, msg: 'No se ha encontrado la ruta'})
        case EErrors.SERVICE_ERROR:
            return res.status(502).send({error: true, msg: error.name})
        case EErrors.DATABASE_ERROR:
            return res.status(502).send({error: true, msg: 'No es posible conectar a base de datos'})
        case EErrors.USER_INPUT_ERROR:
            return res.send({error: true, msg: error.name})
        case EErrors.AUTH_ERROR:
            return res.status(403).send({error: true, msg: 'Sin autorización'})
        default: 
            return res.status(502).send({error: true, msg:'Unhandled error/promise'})
    }
}

export default errorHandlerMiddleware