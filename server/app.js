/* eslint-disable global-require */
/* eslint-disable prettier/prettier */
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const helmet = require('helmet');
const { insertTemplates } = require('./models/EmailTemplate');
const { setupGithub } = require('./github');
const logger = require('./logs');
const routesWithSlug = require('./routesWithSlug');
const getRootUrl = require('../lib/api/getRootUrl');
// const sitemapAndRobots = require('./sitemapAndRobots');

const auth = require('./google');

require('dotenv').config();

const api = require('./api');

const URL_MAP = {
  '/login': '/public/login',
  '/my-books': '/customer/my-books',
};

const dev = process.env.NODE_ENV !== 'production';

const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options);

const port = process.env.PORT || 8000;
const ROOT_URL = getRootUrl();

console.log(process.env.NODE_ENV);
console.log(dev);
console.log(ROOT_URL);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  const MongoStore = mongoSessionStore(session);

  const sess = {
    name: 'builderbook.sid',
    secret: 'HD2w.)q*VqRT4/#NK2M/,E^B)}FED5fWU!dKe[wk',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  };
  server.use(express.json());
  if (!dev) {
    server.set('trust proxy', 1);
    sess.cookie.secure = true;
    server.use(helmet());
  }
  server.use(session(sess));

  await insertTemplates();

  auth({ server, ROOT_URL });
  setupGithub({ server });
  api(server);
  routesWithSlug({ server, app });
  // sitemapAndRobots({ server });

  server.get('*', (req, res) => {
    const url = URL_MAP[req.path];
    if (url) {
      app.render(req, res, url);
    } else {
      handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`);
  });
});
