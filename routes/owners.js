var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const owners = await models.Owner.findAll();
    res.send(owners);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
