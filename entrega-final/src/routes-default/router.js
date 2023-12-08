import { Router } from 'express'

export default class MyRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    init() {}

    // * Retorna el enrutador del recurso para poder usar sus endpoints
    getRouter() {
        return this.router  
    }

    // * Toma todos los mw o controllers y les aplica el req, res y next según corresponda
    applyCallbacks(middlewares) {  
        return middlewares.map(mw => async (...params) => {  // a veces es req, res y otras veces tendrá next
            try {   
                await mw.apply(this,params)  // apply es un método de JS que aplica parámetros, usamos una coma antes del params porque es para concatenar!!
            }
            catch(error) {
                params[1].status(500).send(error)  // el elemento con índice 1 es siempre la respuesta
            }
        })
    }

    create(path, ...cbs) {
        return this.router.post(path, this.applyCallbacks(cbs))
        // devuelve: router.post('/ruta', ...callbacks)
    }

    read(path, ...cbs) {
        return this.router.get(path, this.applyCallbacks(cbs))
    }

    update(path, ...cbs) {
        return this.router.put(path, this.applyCallbacks(cbs))
    }

    destroy(path, ...cbs) {
        return this.router.delete(path, this.applyCallbacks(cbs))
    }

    use(path, ...cbs) {
        return this.router.use(path, this.applyCallbacks(cbs))
    }
}