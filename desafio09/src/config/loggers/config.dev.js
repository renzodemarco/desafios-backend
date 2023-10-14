import { createLogger, format, transports, addColors } from 'winston'

const { simple, colorize } = format 

const levels = { 
    FATAL: 1,
    ERROR: 2,
    WARNING: 3,
    INFO: 4,
    HTTP: 5
}

const levelColors = {
    FATAL: "red",
    ERROR: "magenta",
    WARNING: "yellow",
    INFO: "white",
    HTTP: "blue"
}

addColors(levelColors)

export default createLogger({ 
    levels,
    format: colorize(),
    transports: [
        new transports.Console({ 
            level: 'HTTP', 
            format: simple()
        })
    ]
})