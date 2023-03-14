var express = require('express');
var router = express.Router();
var models = require("../models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');


/* POST/register new owner. */
router.post('/register', async function(req, res, next) {
  let { firstname, lastname, username, email, password } = req.body;
  password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  try {
    const owner = await models.Owner.create({
      firstname, 
      lastname, 
      username, 
      email, 
      password
    });
    res.send(owner);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* POST/login existing owner. */
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  
  try {
    let owner = await models.Owner.findOne({
      where: {
        username,
      },
    });
    if (!owner) {
      res.status(401).send({ error: "Login unsuccessful." });
    } else {
      let passwordsEqual = await bcrypt.compare(password, owner.password);
      if (passwordsEqual) {
        let payload = {ownerId: owner.id};
        let token = jwt.sign(payload, SECRET_KEY);
        delete owner.password;
        res.send ({
          message: "Login successful.",
          token: token,
          user: owner
        })
      } else {
        res.status(401).send({ error: "Login failed." });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
