var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET all pets. */
router.get('/', async function(req, res, next) {
    try {
      const pets = await models.Pet.findAll();
      res.send(pets);
    } catch (error) {
      res.status(500).send(error);
    }
  });


/* GET one pet with their vet/clinic. */
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id,
      },
      include: models.Clinic,
    });
    res.send(pet);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET only vets/clinics of a pet.*/
router.get('/:id/clinics', async function(req, res, next) {
  const { id } = req.params;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id,
      },
    });
    const clinics = await pet.getClinics();
    res.send(clinics);
  } catch (error) {
    res.status(500).send(error);
  }
});





module.exports = router;
