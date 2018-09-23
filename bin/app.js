import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import chalk from 'chalk';
import cors from 'cors';

dotenv.load({ path: '.env' });

const app = express();

const MainRouter = require('./routes/index');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use('/', MainRouter);

mongoose.connect('mongodb://localhost:27017/stationf', { useNewUrlParser: true });
mongoose.connection.on('connected', function () {
  console.log('%s Mongoose default connection open to localhost.', chalk.green('✓'));
});
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

export default app;