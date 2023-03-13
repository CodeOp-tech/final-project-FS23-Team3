var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET all owners. */
router.get('/', async function(req, res, next) {
  try {
    const owners = await models.Owner.findAll();
    res.send(owners);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET one owner with their pets. */
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const owner = await models.Owner.findOne({
      where: {
        id,
      },
      include: models.Pet,
    });
    res.send(owner);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET only pets of an owner.*/
router.get('/:id/pets', async function(req, res, next) {
  const { id } = req.params;
  try {
    const owner = await models.Owner.findOne({
      where: {
        id,
      },
    });
    const pets = await owner.getPets();
    res.send(pets);
  } catch (error) {
    res.status(500).send(error);
  }
});

// /* POST new owner. */
// router.post('/', async function(req, res, next) {
//   const { firstname, lastname, username, email, password } = req.body;
//   try {
//     const owner = await models.Owner.create({
//       firstname, 
//       lastname, 
//       username, 
//       email, 
//       password
//     });
//     res.send(owner);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

/* PUT existing owner. */
router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { firstname, lastname, username, email, password } = req.body;
  try {
    const owner = await models.Owner.findOne({
      where: {
        id,
      },
    });

    const updOwner = await owner.update({ firstname, lastname, username, email, password })
    res.send(updOwner);

  } catch (error) {
    res.status(500).send(error);
  }
});

/* DELETE one owner. */
router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    await models.Owner.destroy({
      where: {
        id,
      },
    });

    const owners = await models.Owner.findAll();
    res.send(owners);

  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET one owner by pet?. */

/* GET one owner by clinic?. */

module.exports = router;
