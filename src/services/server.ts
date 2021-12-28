import express, { ErrorRequestHandler } from 'express';
import * as http from 'http';
import router from '../routes/index';
import path from 'path';
import Config from '../config';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from '../middleware/admin';
import { Logger } from './logger';

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_SRV,
  }),

  secret: Config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // maxAge: Config.SESSION_COOKIE_TIMEOUT_MIN * 60 * 1000,
  },
};

const app = express();
app.use(session(StoreOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  Logger.info(`REQ.USER ===> ${JSON.stringify(req.user)}`);
  next();
});
app.use('/api', router);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  Logger.error(`HUBO UN ERROR ${err.message}`);
  res.status(500).json({
    err: err.message,
  });
};

app.use(errorHandler);

const myServer = new http.Server(app);

myServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

export default myServer;
