import opts from './args.js'


let logger

if (opts.mode === 'production') {
    const { default: loggerProductionConfig } = await import('./loggers.prod.js');
    logger = loggerProductionConfig
} else {
    const { default: loggerDevConfig } = await import('./loggers.dev.js');
    logger = loggerDevConfig
}

export default logger