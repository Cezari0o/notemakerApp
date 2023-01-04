import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function connectDB() {

  if(!process.env.MONGO_URI || !process.env.DB_NAME) {
    throw new Error('MONGO_URI/DB_NAME must be defined');
  }

  mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME }, (err) => {
    if(err) {
      console.log('Error connecting to database!');
      console.log(err.name, err.message);
      console.log('Stack: ', err.stack);
      
      throw err;
    }
    console.log('Connected to the database!');
  });

}


export default connectDB;