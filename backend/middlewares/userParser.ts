import Router from 'express';

const route = Router();

route.use((req, res, next) => {
  // Adding the user id to be verified in the subsequent routes
  req['userId'] = req['auth'].userId; 
  next();
});


export default route;