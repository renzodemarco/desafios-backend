import { createLogger, format, transports, addColors } from 'winston'

const { simple, colorize } = format 

const levels = { 
    INFO: 2,
    WARNING: 3,
    ERROR: 4,
    FATAL: 5
}

const levelColors = {
    HTTP: "blue",
    INFO: "white",
    WARNING: "yellow",
    ERROR: "orange",
    FATAL: "red"
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