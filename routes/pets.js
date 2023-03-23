var express = require('express');
var router = express.Router();
var models = require("../models");
const multer = require('multer');

const PUBLIC_DIR_URL = 'http://localhost:5000/images';

/**
 * Multer initialization
 **/
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/images');  // store files here
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);  // keep original filename
  }
});
const upload = multer({ storage });

//---------GETS-----------

/* GET all pets. */
router.get('/', async function(req, res, next) {
    try {
      const pets = await models.Pet.findAll({ raw: true });
      let petsWithUrls = pets.map(r => ({...r, img_url: `${PUBLIC_DIR_URL}/${r.img_filename}`}));
      res.send(petsWithUrls);
    } catch (err) {
      res.status(500).send({error: err.message});
    }
  });

// GET all pets for one owner
  router.get('/:id/pets', async function(req, res, next) {
    const { id } = req.params;

    try {
      const pets = await models.Pet.findAll({
        raw: true,

        where: {
          OwnerId: id
        },
      });
      
      let petsWithUrls = pets.map(r => ({...r, img_url: `${PUBLIC_DIR_URL}/${r.img_filename}`}));

      res.status(201).send( petsWithUrls );

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
router.post('/:id/pets', upload.single('img_filename'), async function(req, res, next) {
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
      img_filename: req.file.originalname
    });
    res.status(201).send(pet);

  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

//---------PUTS----------

router.put('/:id',upload.single('img_filename'), async function(req, res, next) {
  const { id } = req.params;
  const { name, type, age, sex } = req.body;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id,
      },
    });

    const updPet = await pet.update({ name, type, age, sex, img_filename: req.file.originalname });
    res.send(updPet);

  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

//----------DELETE-----------

router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    await models.Pet.destroy({
      where: {
        id,
      },
    });

    const pets = await models.Pet.findAll();
    res.send(pets);

  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
