import dotenv from 'dotenv'
import opts from './args.js'

dotenv.config({
    path: opts.mode === 'production' ? './.env.prod' : './.env.dev',
})


export default {
    MONGO_URI: process.env.MONGO_URI,
    GITHUB_KEY: process.env.GITHUB_KEY,
    JWT_SECRET: process.env.JWT_SECRET
}