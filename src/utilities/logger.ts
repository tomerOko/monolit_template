  
import { format, createLogger, transports } from 'winston'

const { timestamp, combine, printf, errors } = format;
const logFormat = printf(({
    level,
    message,
    timestamp,
    stack
}) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = createLogger({
    format: combine(
        format.colorize(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        errors({
            stack: true
        }),
        logFormat
    ),
    transports: [new transports.Console()],
});
