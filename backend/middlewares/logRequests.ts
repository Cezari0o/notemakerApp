import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  const request: { [key: string]: any } = {};

  request['method'] = req.method;
  request['url'] = req.url;
  request['time'] = new Date().toTimeString();
  request['user'] = req.headers['user-agent'];

  console.log(request);
  next();
 
});

export default router;