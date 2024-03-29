import express from "express";
import HttpStatus from "http-status-codes";
import users from '../src/users/routes';
import notes from '../src/notes/routes';
import tags from '../src/tags/routes';
import auth from '../src/authentication/routes'

const router = express.Router();

router.get('/', (req, res) => {
  res.status(HttpStatus.OK).send('Yes, its Working!');
});

router.get("/about", (req, res) => {

  if(req.accepts("json")) {
    res.json({ about: "Application to manage notes" });
    return;
  }
  res.send("Application to manage notes");
});

router.use('/users', users);
router.use('/notes', notes);
router.use('/tags', tags);
router.use('/login', auth);

export default router;