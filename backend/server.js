import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  const request = {};

  request['method'] = req.method;
  request['url'] = req.url;
  request['time'] = new Date().toTimeString();
  request['user'] = req.headers['user-agent'];

  console.log(request);
  next();
});

app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

