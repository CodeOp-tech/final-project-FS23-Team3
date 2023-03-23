var express = require('express');
var router = express.Router();
var models = require("../models");
const multer = require('multer');

const PUBLIC_DIR_URL = 'http://localhost:5000/files';

/**
 * Multer initialization
 **/
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/files');  // store files here
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);  // keep original filename
  }
});
const upload = multer({ storage });

//---------GETS----------
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET all appointments. */
router.get('/', async function(req, res, next) {
  try {
    const appointments = await models.Appointment.findAll({ raw: true });
    let appointmentsWithUrls = appointments.map(r => ({...r, file_url: `${PUBLIC_DIR_URL}/${r.files}`}));
    res.send(appointmentsWithUrls);
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
    const appointments = await pet.getAppointments({
      raw: true,
    });
    let appointmentsWithUrls = appointments.map(r => ({...r, file_url: `${PUBLIC_DIR_URL}/${r.files}`}));
    res.send(appointmentsWithUrls);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET all appointments of a pet on a given date.*/
router.get('/:id/:date', async function(req, res, next) {
  const { id } = req.params;
  const { date } = req.params;
  const beginningOfDay = date + "T00:00:00.000Z";
  const endOfDay = date + "T23:59:59.000Z";
  try {
    const pet = await models.Pet.findOne({
      where: {
        id
      },
    });
    const appointments = await pet.getAppointments({
      where: {date: {
          [Op.gte]: beginningOfDay,
          [Op.lte]: endOfDay,
        },
      }
    });
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET all future appointments order by date. */
router.get('/future', async function(req, res, next) {
  const today = new Date();
  let todayMonth = today.getUTCMonth() + 1;
  let todayDay = today.getUTCDate();
  let todayYear = today.getUTCFullYear();
  newToday = new Date(`${todayYear}-${todayMonth}-${todayDay}`);
  try {
    const appointments = await models.Appointment.findAll({
      order: [['date', 'ASC']],
      where: {
        date: {
          [Op.gt]: newToday
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
  let todayMonth = today.getUTCMonth() + 1;
  let todayDay = today.getUTCDate();
  let todayYear = today.getUTCFullYear();
  newToday = new Date(`${todayYear}-${todayMonth}-${todayDay}`);
  try {
    const appointments = await models.Appointment.findAll({
      order: [['completeBy', 'ASC']],
      where: {
        completeBy: {
          [Op.gt]: newToday
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
  let todayMonth = today.getUTCMonth() + 1;
  let todayDay = today.getUTCDate() -1;
  let todayYear = today.getUTCFullYear();
  newToday = new Date(`${todayYear}-${todayMonth}-${todayDay}`);
  let futureMonth = today.getUTCMonth() + 4;
  let day = today.getUTCDate() + 1;
  let year = today.getUTCFullYear();
  let future = new Date(`${year}-${futureMonth}-${day}`);
  try {
    const appointments = await models.Appointment.findAll({
      order: [['completeBy', 'ASC']],
      where: {
        completeBy: {
          [Op.gt]: newToday,
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
  let todayMonth = today.getUTCMonth() + 1;
  let todayDay = today.getUTCDate();
  let todayYear = today.getUTCFullYear();
  newToday = new Date(`${todayYear}-${todayMonth}-${todayDay}`);
  let futureMonth = today.getUTCMonth() + 4;
  let day = today.getUTCDate() + 1;
  let year = today.getUTCFullYear();
  let future = new Date(`${year}-${futureMonth}-${day}`);
  try {
    const appointments = await models.Appointment.findAll({
      order: [['date', 'ASC']],
      where: {
        date: {
          [Op.gt]: newToday,
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
  router.post('/', upload.single('files'), async function(req, res, next) {
    let id = req.body.PetId;
    const { date, title, summary, nextSteps, completeBy, followups, PetId, ClinicId } = req.body;
    try {
      const pet = await models.Pet.findOne({
        where: {
          id,
        },
      });
      if (req.file){
        const appointment = await pet.createAppointment({
          date, 
          title, 
          summary, 
          nextSteps, 
          completeBy, 
          followups, 
          PetId,
          ClinicId,
          files: req.file.originalname
        });
        res.status(201).send(appointment);
      } else{
        const appointment = await pet.createAppointment({
          date, 
          title, 
          summary, 
          nextSteps, 
          completeBy, 
          followups, 
          PetId,
          ClinicId
        });
        res.status(201).send(appointment);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  /* POST new appointment associated to pet and clinic. */
  router.post('/:clinicKey', async function(req, res, next) {
    let { clinicKey } = req.params;
    const { date, title, PetId } = req.body;
    try {
      const clinic = await models.Clinic.findOne({
        where: {
          clinicKey,
        },
      });
      const appointment = await clinic.createAppointment({
        date, 
        title,  
        PetId
      });
      res.status(201).send(appointment);
    } catch (error) {
      res.status(500).send(error);
    }
  });

    /* POST new appointment via Fav form. */
    router.post('/clinic/:id', async function(req, res, next) {
      let { id } = req.params;
      const { date, title, PetId } = req.body;
      try {
        const clinic = await models.Clinic.findOne({
          where: {
            id,
          },
        });
        const appointment = await clinic.createAppointment({
          date, 
          title,  
          PetId
        });
        res.status(201).send(appointment);
      } catch (error) {
        res.status(500).send(error);
      }
    });

//----------PUTS---------

/* PUT existing appointment. */
router.put('/:id', upload.single('files'), async function(req, res, next) {
    const { id } = req.params;
    const { date, title, summary, nextSteps, completeBy, followups, PetId, ClinicId } = req.body;
    try {
      const appointment = await models.Appointment.findOne({
        where: {
          id,
        },
      });
      if (req.file){
        const updAppointment = await appointment.update({ date, title, summary, nextSteps, completeBy, followups, PetId, ClinicId, files: req.file.originalname })
        res.send(updAppointment);
      } else {
        const updAppointment = await appointment.update({ date, title, summary, nextSteps, completeBy, followups, PetId, ClinicId })
        res.send(updAppointment);
      }
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