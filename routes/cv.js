const express = require("express");

const cvController = require('../controllers/cv');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

//GET /cv/allpersons
router.get('/persons', cvController.getPersons);

//POST /cv/persons
router.post('/persons', cvController.createPerson);

//GET /cv/persons/3
router.get('/persons/:personId', cvController.getPerson);

//PUT /cv/persons/3
router.put('/persons/:personId', isAuth, cvController.updatePerson);

//DELETE /cv/persons/3
router.delete('/persons/:personId', isAuth, cvController.deletePerson);

module.exports = router;
