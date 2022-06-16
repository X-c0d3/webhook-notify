import express, { Express, Request, Response, NextFunction } from 'express';
//import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Logging from './utils/logging';
import { AppConfig } from './constants';
import sendLineNotify from './service/line.service';

const app: Express = express();

const coreOptions: cors.CorsOptions = {
  origin: [
    'http://localhost:5002', // front-end
  ],
};

app.use(cookieParser());
app.use(cors(coreOptions)); // register cors
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('uptime:', req);
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  if (req.body.msg.length > 0) {
    sendLineNotify(`
${req.body.msg}`);
    Logging.log(req.body.msg);
  }

  next();
});

app.listen(AppConfig.PORT, () => {
  Logging.info(`Server start on http://127.0.0.1:${AppConfig.PORT}`);
  Logging.info('Server started');
});

// routes(app);
// http.createServer(app).listen(config.port, () => Logging.info(`Server is running on port ${port}`));
