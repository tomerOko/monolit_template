import { NextFunction, Request, Response } from "express";
import { kill } from "process";

type LogEvent = "recived" | "error" | "finished" | "debug" | "warn" | "error";

const logger = (req:Request, res:Response, next:NextFunction, namespace: string, logType : LogEvent, additionalOjectToPrint?:any) => {
    additionalOjectToPrint = additionalOjectToPrint? `[ADDITIONAL DATA]:${additionalOjectToPrint}` : ""
    const logMassege = `TIME:[${getTimeStamp()}] EVENT:[${logType.toUpperCase()}] [${namespace}] METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] ${additionalOjectToPrint}`
    
    switch (logType) {
        case "recived":
            console.info(logMassege) // no need to listen on one of the request lifecyfle stage becouse this function is already listening to an http server on new http requests
            break;
        case "error":
           res.on("error", (err) =>console.error(logMassege, err))
           break;
        case "finished":
           res.on("finish" , ()=>console.info(logMassege, ` - STATUS: [${res.statusCode}]`))
           break;
        case "debug":
            console.debug( logMassege )
        break;
        case "warn":
            console.warn( logMassege )
            break;
        case "error":
            console.error( logMassege )
            break;
        default:
            console.log("a wrong log type was entered the logger")
            break;
    }

    next();

}

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

export{logger, LogEvent }
