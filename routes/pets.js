var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  router.get('/', async function(req, res, next) {
    try {
      const pets = await models.Pet.findAll();
      res.send(pets);
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

module.exports = router;
