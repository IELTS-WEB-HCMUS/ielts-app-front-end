const router = require('express').Router();
const controllerVocals = require('../controllers/vocabs.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerVocals.getVocabsCategories);
router.post('/update-topic', isAuthenticated, controllerVocals.updateTopic);  

module.exports = router;