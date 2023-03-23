var express = require('express');
var router = express.Router();
var models = require("../models");


//--------GETS-----------

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

  /* GET all vets/clinics of a pet.*/
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

/* GET all vets/clinics by owner.*/
router.get('/:id/clinics', async function(req, res, next) {
  const { id } = req.params;
  try {
    const clinics = await models.Clinic.findAll({
      where: {
        OwnerId: id,
      },
    });
    res.send(clinics);
  } catch (error) {
    res.status(500).send(error);
  }
});

//--------POSTS------------

/* POST new clinic. */
router.post('/:clinicKey', async function(req, res, next) {
  const { clinicKey } = req.params;
  const { name, contactPhone, address } = req.body;
  try {
    const clinic = await models.Clinic.create({
      name, 
      contactPhone, 
      address,
      clinicKey
    });
    res.status(201).send(clinic);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* PUT to add PetId association to given clinic */
// router.put("/:id/pets", async function (req, res, next) {
//   const { id } = req.params;
//   const { pets } = req.body;
//   try {
//     const clinic = models.Clinic.findOne({
//       where: {
//         id,
//       },
//     });
//     const data = await clinic.addPets(pets);
//     res.send(clinic)
//   } catch(err){
//     res.status(500).send(err)
//   }
// })

  /* POST new clinic associated to pet. */
  router.post('/:id/pet', async function(req, res, next) {
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

  

//---------PUTS------------

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
  

  //DO WE WANT TO ADD A LINK BETWEEN APPOINTMENTS AND CLINICS? RIGHT NO WE HAVE NO ROUTES FOR THAT

module.exports = router;