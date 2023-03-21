var express = require('express');
var router = express.Router();
var models = require("../models");

//---------GETS-----------

/* GET all pets. */
router.get('/', async function(req, res, next) {
    try {
      const pets = await models.Pet.findAll();
      res.send(pets);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// GET all pets for one owner
  router.get('/:id/pets', async function(req, res, next) {
    const { id } = req.params;

    try {
      const pets = await models.Pet.findAll({
        where: {
          OwnerId: id
        },
      });

      res.send( pets );

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
      include: [models.Appointment, models.Clinic]
    });
    res.send(pet);
  } catch (error) {
    res.status(500).send(error);
  }
});

//----------POSTS---------

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
      sex,

    });
    res.status(201).send(pet);
  } catch (error) {
    res.status(500).send(error);
  }
});

//---------PUTS----------

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

//----------DELETE-----------

// router.delete('/:id', ensureSameUser, async function(req, res, next) {
//   const { id } = req.params;
//   try {
//     await models.Pet.destroy({
//       where: {
//         id,
//       },
//     });

//     const owners = await models.Owner.findAll();
//     res.send(owners);

//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
