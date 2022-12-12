import { expressjwt } from "express-jwt";
import express from "express";
import fs from 'fs'

const auth = (() => {

  const key = fs.readFileSync('key', 'utf8');

  return expressjwt({
    secret: key,
    algorithms: ['RS512']
  }).unless({ path: ['/login', '/users', '/', '/about']});
})();

export default auth;