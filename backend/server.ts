import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import logger from './middlewares/logRequests';
import connectDB from './services/dbConnect';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(logger);

// Routes
app.use(routes);

// Database
connectDB();

app.listen(port, () => { 
  console.log(`Servidor rodando na porta ${port}`);
});
