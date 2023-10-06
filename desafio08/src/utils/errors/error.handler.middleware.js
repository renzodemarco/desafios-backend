import EErrors from "./EnumErrors.js";

const errorHandlerMiddleware = (error, req, res, next) => {
    console.log(error.cause)
    switch (error.code) {
        case EErrors.ROUTING_ERROR:
            res.status(404).send({error: true, msg: 'No se ha encontrado la ruta'})
        break
        case EErrors.SERVICE_ERROR:
            res.status(502).send({error: true, msg: error.name})
        break
        case EErrors.DATABASE_ERROR:
            res.status(502).send({error: true, msg: 'No es posible conectar a base de datos'})
        break
        case EErrors.USER_INPUT_ERROR:
            res.send({error: true, msg: error.name})
        break
        case EErrors.AUTH_ERROR:
            res.status(403).send({error: true, msg: 'Sin autorización'})
        break
        default: res.status(502).send({error: true, msg:'Unhandled error/promise'})
        
    }
}

export default errorHandlerMiddleware