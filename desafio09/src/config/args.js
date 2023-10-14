import { Command } from 'commander'

const program = new Command()

program.option('--mode <mode>', 'Entorno', 'dev')

program.parse()

const opts = program.opts()

export default opts
