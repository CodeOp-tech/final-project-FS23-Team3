var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET all clinics. */
router.get('/', async function(req, res, next) {
    try {
      const clinics = await models.Clinic.findAll();
      res.send(clinics);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  /* GET one clinic with its pets. */
router.get('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
      const clinic = await models.Clinic.findOne({
        where: {
          id,
        },
        include: models.Pet,
      });
      res.send(clinic);
    } catch (error) {
      res.status(500).send(error);
    }
  });

/* POST new clinic. */
router.post('/', async function(req, res, next) {
  const { name, contactPhone, latitude, longitude, address } = req.body;
  try {
    const clinic = await models.Clinic.create({
      name, 
      contactPhone, 
      latitude, 
      longitude,
      address
    });
    res.status(201).send(clinic);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* PUT existing clinic. */
router.put('/:id', async function(req, res, next) {
    const { id } = req.params;
    const { name, contactPhone, latitude, longitude, address } = req.body;
    try {
      const clinic = await models.Clinic.findOne({
        where: {
          id,
        },
      });
      const updClinic = await clinic.update({ name, contactPhone, latitude, longitude, address })
      res.send(updClinic);
  
    } catch (error) {
      res.status(500).send(error);
    }
  });

  /* POST new clinic associated to pet. */
router.post('/:id/clinics', async function(req, res, next) {
  const { id } = req.params;
  const { name, contactPhone, latitude, longitude, address } = req.body;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id,
      },
    });
    const clinic = await pet.createClinic({
      name, 
      contactPhone, 
      latitude, 
      longitude,
      address
    });
    res.status(201).send(clinic);
  } catch (error) {
    res.status(500).send(error);
  }
});
  

  //DO WE WANT TO ADD A LINK BETWEEN APPOINTMENTS AND CLINICS? RIGHT NO WE HAVE NO ROUTES FOR THAT

module.exports = router;