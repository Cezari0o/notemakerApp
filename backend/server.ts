import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import logger from './middlewares/logRequests';
import connectDB from './services/dbConnect';
import HttpStatus from "http-status-codes";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Config
app.use(express.json()); // for parsing application/json

// Middlewares
app.use(logger);

// Routes
app.use(routes);

// Database
connectDB();

// Route to respond to any request not defined
app.use((req, res, next) => {
    res.status(HttpStatus.NOT_FOUND).send('Sorry, i can\'t find that!');
});

app.listen(port, () => { 
  console.log(`Servidor rodando na porta ${port}`);
});
