import * as dotenv from 'dotenv';
dotenv.config();

const AppConfig = {
  APP_ENV: process.env.APP_ENV,
  LINE_TOKEN: process.env.LINE_TOKEN,
  PORT: process.env.PORT || 5001,
};

export { AppConfig };
