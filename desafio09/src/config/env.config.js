import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program.option('--mode <mode>', "Modo de ejecución", "dev")

program.parse()

const opts = program.opts()

dotenv.config({
    path: opts.mode === 'production' ? './.env.prod' : './.env.dev'
})

export default {
    MONGO_URI: process.env.MONGO_URI,
    GITHUB_KEY: process.env.GITHUB_KEY,
    JWT_SECRET: process.env.JWT_SECRET
}