import mongoose from 'mongoose'

// * PATRÓN SINGLETON: Es un patrón utilizado para cuando se requiere que la aplicación tenga una única instancia de dicha clase (por ejemplo, al abrir una conexión en base de datos). 

export default class MongoSingleton {
    
    static #instance  // Las propiedades y métodos estáticos son miembros de la clase en lugar de pertenecer a las instancias individuales de la clase. Esto permite que se pueda acceder a ellos sin necesidad de instanciar la clase.

    constructor() {
        mongoose.connect('mongodb://127.0.0.1:27017/coderhouse')
    }

    static getInstance() {
        if (this.#instance) {
            console.log('Mongo ya estaba conectado anteriormente')
        } else {
            this.#instance = new MongoSingleton()
            console.log('Conectando...')
        }
        return this.#instance
    }
}