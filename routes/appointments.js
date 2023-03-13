var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET all appointments. */
router.get('/', async function(req, res, next) {
  try {
    const appointments = await models.Appointment.findAll();
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET one appointment with its pet. */
router.get('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
      const appointment = await models.Appointment.findOne({
        where: {
          id,
        },
        include: models.Pet,
      });
      res.send(appointment);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  /* POST new appointment associated to pet. */
router.post('/', async function(req, res, next) {
    let id = req.body.PetId;
    const { date, title, summary, nextSteps, completeBy, followups, PetId } = req.body;
    try {
      const pet = await models.Pet.findOne({
        where: {
          id,
        },
      });
      const appointment = await pet.createAppointment({
        date, 
        title, 
        summary, 
        nextSteps, 
        completeBy, 
        followups, 
        PetId
      });
      res.status(201).send(appointment);
    } catch (error) {
      res.status(500).send(error);
    }
  });

/* PUT existing appointment. */
router.put('/:id', async function(req, res, next) {
    const { id } = req.params;
    const { date, title, summary, nextSteps, completeBy, followups, PetId } = req.body;
    try {
      const appointment = await models.Appointment.findOne({
        where: {
          id,
        },
      });
  
      const updAppointment = await appointment.update({ date, title, summary, nextSteps, completeBy, followups, PetId })
      res.send(updAppointment);
  
    } catch (error) {
      res.status(500).send(error);
    }
  });

  /* DELETE one appointment. */
router.delete('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
      await models.Appointment.destroy({
        where: {
          id,
        },
      });
  
      const appointments = await models.Appointments.findAll();
      res.send(appointments);
  
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

module.exports = router;