import dotenv from 'dotenv'

dotenv.config()


export default {
    MONGO_URI: 'process.env.MONGO_URI',
    GITHUB_KEY: 'process.env.GITHUB_KEY',
    JWT_SECRET: 'process.env.JWT_SECRET'
}