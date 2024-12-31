const router = require('express').Router();
const controllerVocals = require('../controllers/vocabs.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerVocals.getVocabsCategories);
router.post('/update-topic', isAuthenticated, controllerVocals.updateTopic);  
router.delete('/delete', isAuthenticated, controllerVocals.deleteVocab);
router.post('/add', isAuthenticated, controllerVocals.addVocabs);
router.post('/update', isAuthenticated, controllerVocals.updateVocab);

module.exports = router;