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


/* GET one pet with their vet/clinic and appointments. */
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id,
      },
      include: [models.Clinic, models.Appointment]
    });
    res.send(pet);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET only appointments of a pet.*/
router.get('/:id/appointments', async function(req, res, next) {
  const { id } = req.params;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id,
      },
    });
    const appointments = await pet.getAppointments();
    res.send(appointments);
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

/* POST new pet associated to owner. */
router.post('/:id/pets', async function(req, res, next) {
  const { id } = req.params;
  const { name, type, age, sex } = req.body;
  try {
    const owner = await models.Owner.findOne({
      where: {
        id,
      },
    });
    const pet = await owner.createPet({
      name, 
      type, 
      age, 
      sex
    });
    res.status(201).send(pet);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { name, type, age, sex } = req.body;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id,
      },
    });

    const updPet = await pet.update({ name, type, age, sex })
    res.send(updPet);

  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
