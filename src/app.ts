
import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors'
import rateLimiter from './middleware/custom/rateLimiter'
import { rootRouter } from "./router";
import { logger } from "./utilities/logger";
import { http_logger } from "./middleware/custom/httpLogger";
import { http_error_handler } from "./middleware/custom/httpErrorHandler";
import { config } from "./config/confing_mock";

export const app = express()
app.use(rateLimiter);
app.use(cors(config.api_server.corsConfig));
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(http_logger)

app.use('/api' , rootRouter) 

app.use(http_error_handler);










