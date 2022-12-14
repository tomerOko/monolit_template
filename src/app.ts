
import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors'
import rateLimiter from './middleware/packages/rate_limiter'
import { rootRouter } from "./router";
import { http_logger } from "./middleware/custom/http_logger";
import { config } from "./config/confing_mock";
import { HttpErrorHandler } from "./middleware/custom/http_error_handler";
import { route_not_found } from "./middleware/custom/route_not_found";
import { addTransactionIdToRequestAsyncStorage, initializeAsiyncLocalStorage } from "./middleware/custom/async_storage";
import { health_check } from "./middleware/custom/health_check";
import cookieParser  from 'cookie-parser'

export const app = express()
app.use(rateLimiter);
app.use(cors(config.system.api_server.corsConfig));
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(http_logger)
app.use(initializeAsiyncLocalStorage)
app.use(addTransactionIdToRequestAsyncStorage)
app.use('/health_check', health_check)
app.use('/' , rootRouter) 
app.use(route_not_found)
app.use(HttpErrorHandler.handle_app_level_error);








