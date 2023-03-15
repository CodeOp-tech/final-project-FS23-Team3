var express = require('express');
var router = express.Router();
var models = require("../models");

//---------GETS----------
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET all appointments. */
router.get('/', async function(req, res, next) {
  try {
    const appointments = await models.Appointment.findAll();
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET all appointments of a pet.*/
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

/* GET all future appointments order by date. */
router.get('/future', async function(req, res, next) {
  const today = new Date();
  try {
    const appointments = await models.Appointment.findAll({
      order: [['date', 'ASC']],
      where: {
        date: {
          [Op.gt]: today
        }
      }
    });
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET all appointments order by completeBy. */
router.get('/complete-by', async function(req, res, next) {
  const today = new Date();
  try {
    const appointments = await models.Appointment.findAll({
      order: [['completeBy', 'ASC']],
      where: {
        completeBy: {
          [Op.gt]: today
        }
      }
    });
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET urgent appointments (completeBy within 3 months of today) order by completeBy. */
router.get('/urgent', async function(req, res, next) {
  const today = new Date();
  let futureMonth = today.getUTCMonth() + 4;
  let day = today.getUTCDate() + 1;
  let year = today.getUTCFullYear();
  let future = new Date(`${year}-${futureMonth}-${day}`);
  try {
    const appointments = await models.Appointment.findAll({
      order: [['completeBy', 'ASC']],
      where: {
        completeBy: {
          [Op.gt]: today,
          [Op.lt]: future,
        }
      }
    });
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/urgent-appts', async function(req, res, next) {
  const today = new Date();
  let futureMonth = today.getUTCMonth() + 4;
  let day = today.getUTCDate() + 1;
  let year = today.getUTCFullYear();
  let future = new Date(`${year}-${futureMonth}-${day}`);
  try {
    const appointments = await models.Appointment.findAll({
      order: [['date', 'ASC']],
      where: {
        date: {
          [Op.gt]: today,
          [Op.lt]: future,
        }
      }
    });
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

  //----------POSTS--------------

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

//----------PUTS---------

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



module.exports = router;