const express = require("express");

const cvController = require('../controllers/cv');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

//GET /feed/posts
router.get('/allpersons', cvController.getPersons);

router.post('/allpersons', isAuth, cvController.createPerson);

router.get('/allpersons/:personId', cvController.getPerson);

router.put('/allpersons/:personId', isAuth, cvController.updatePerson);

router.delete('/allpersons/:personId', isAuth, cvController.deletePerson);

//router.get('/allpersons', cvController.getPersonByName);

 

module.exports = router;