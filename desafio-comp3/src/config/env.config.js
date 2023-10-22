import dotenv from 'dotenv'
import args from './args.js'

dotenv.config({
    path: args.mode === 'production' ? './.env.prod' : './.env.dev',
})

export default {
    MONGO_URI: process.env.MONGO_URI,
    GITHUB_KEY: process.env.GITHUB_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    GMAIL_MAIL: process.env.GMAIL_MAIL,
    GMAIL_KEY: process.env.GMAIL_KEY
}