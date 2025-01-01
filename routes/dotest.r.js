const router = require('express').Router();
const controllerDoTest = require('../controllers/dotest.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerDoTest.getDotestPage);
router.get('/detailquiz', isAuthenticated, controllerDoTest.fetchQuizDetail);
router.post('/submitquiz', isAuthenticated, controllerDoTest.submitQuiz);    
router.post('/lookup', isAuthenticated, controllerDoTest.fetchLookupVocab);  

module.exports = router;