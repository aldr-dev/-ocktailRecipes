import path from 'path';
import {CorsOptions} from 'cors';
import {configDotenv} from 'dotenv';

configDotenv();

const rootPath = __dirname;
const corsWhitelist = ['http://localhost:5173'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  corsOptions,
  database: 'mongodb://localhost/cocktailRecipes',
  google: {
    clientId: process.env.GOOGLE_CLIEETID,
    clientSecret: process.env.GOOGLE_CLIEETSECRET,
  },
};

export default config;