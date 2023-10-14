import opts from './args.js'


let logger

if (opts.mode === 'production') {
    const { default: loggerProductionConfig } = await import('./loggers/config.prod.js');
    logger = loggerProductionConfig
} else {
    const { default: loggerDevConfig } = await import('./loggers/config.dev.js');
    logger = loggerDevConfig
}

export default logger