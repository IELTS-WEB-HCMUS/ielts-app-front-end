const router = require('express').Router();
const controllerVocals = require('../controllers/vocabs.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerVocals.getVocabs);

module.exports = router;