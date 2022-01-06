import express, { ErrorRequestHandler } from 'express';
import * as http from 'http';
import router from '../routes/index';
import path from 'path';
import Config from '../config';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from '../middleware/admin';
import { Logger } from './logger';
import handlebars from 'express-handlebars';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './../apidoc/test.json';
import fileUpload from 'express-fileupload';

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`,
  }),

  secret: Config.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // maxAge: Config.TOKEN_KEEP_ALIVE * 60 * 1000,
  },
};

const app = express();
app.use(session(StoreOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

// configuracion de hbs
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPth = path.resolve(
  __dirname,
  '../../views/layouts/index.hbs'
);
const partialDirPath = path.resolve(__dirname, '../../views/partials');

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
    partialsDir: partialDirPath,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  Logger.info(`REQ.USER ===> ${JSON.stringify(req.user)}`);
  next();
});
app.use('/api', router);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => {
  res.render('main');
});

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
