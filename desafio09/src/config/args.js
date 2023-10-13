import { Command } from 'commander'

const args = new Command()

args.option('--mode <mode>', 'Entorno', 'dev')

args.parse()

export default args.opts
