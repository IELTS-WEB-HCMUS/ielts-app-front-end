const router = require('express').Router();
const controllerQuizResult = require('../controllers/quizresult.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerQuizResult.getQuizResult);

module.exports = router;