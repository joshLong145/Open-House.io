import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import parseRoutes from './routes/parsing';

app.use('/api', parseRoutes);

app.listen(5000);
console.log('api listening on 3000');