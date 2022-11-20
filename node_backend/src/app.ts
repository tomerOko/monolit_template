
import express, { Application, Request, Response, NextFunction } from "express";
import {logger} from './middleware/logging';
import cors from 'cors'
import rateLimiter from './middleware/rateLimiter'
import {testConnection} from './models/UserModel'
import { rootRouter } from "./services/community/routes/All_API";

//well.. :)
export const app = express()

//@desc  express-rate-limit
app.use(rateLimiter);

//@desc cros env to make the browser not block requerst from diffrent port (domain = protocol+host+port. cors = diffrent domains)
//if serving the client as a static folder from the server, or if using nginx (or any other reverse proxy) thi part can be removed as well
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));

// //@desc Static Folder 
// //'_dirname' means 'if the run command lunced from any directory other then the one containing this file, the use the absolute path of this file'
// app.use(express.static(path.join(__dirname, 'dist')))

//@desc json parser
app.use(express.json())
//@desc URLs matadata parser
app.use(express.urlencoded({extended : false}))



// @desc logging middleware (not for errors)
const NAMESPACE = 'MAIN (SERVER)';
app.use((req, res, next) => logger(req, res, next, NAMESPACE,"recived"))
app.use((req, res, next) => logger(req, res, next, NAMESPACE,"error",))
app.use((req, res, next) => logger(req, res, next, NAMESPACE,"finished",))

// @desc routers tree 
app.use('/' , rootRouter) 


// @desc logging middleware for errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404).json({
      message: error.message
  });
});










