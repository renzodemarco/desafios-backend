import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program.option('--mode <mode>', 'Entorno', 'dev')

program.parse()

const args = program.opts()

dotenv.config({
    path: args.mode === 'production' ? './.env.prod' : './.env.dev',
})

export default {
    MONGO_URI: process.env.MONGO_URI,
    GITHUB_KEY: process.env.GITHUB_KEY,
    JWT_SECRET: process.env.JWT_SECRET
}