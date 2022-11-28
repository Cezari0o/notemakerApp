import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function connectDB() {

  if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  mongoose.connect(process.env.MONGO_URI, { dbName: 'NoteMakerDB' }, (err) => {
    if(err) {
      console.log('Erro ao conectar no banco de dados');
      console.log(err.name, err.message);
      console.log('Stack: ', err.stack);
      
      throw err;
    }
    console.log('Conectado ao banco de dados!');
  });

}


export default connectDB;