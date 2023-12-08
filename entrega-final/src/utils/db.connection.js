import mongoose from 'mongoose'
import config from '../config/env.config.js'

// Acá utilizo el patrón Singleton para conectarme una única vez a MongoDB

export default class MongoSingleton {
    
    static #instance

    constructor() {
        mongoose.connect(config.MONGO_URI)
    }

    static getInstance() {
        if (this.#instance) {
            console.log('MongoDB ya se encuentra conectado')
        } else {
            this.#instance = new MongoSingleton()
            console.log('Conectando a MongoDB...')
        }
        return this.#instance
    }
}