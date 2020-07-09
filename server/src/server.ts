import express, { response } from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);// Importing Routes that are being exported from routes.ts 

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);