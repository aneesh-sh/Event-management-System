import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

export default app;
