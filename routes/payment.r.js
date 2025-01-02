const router = require('express').Router();
const controllerPayment = require('../controllers/payment.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerPayment.getPayment);
router.post('/buy-more-turn', isAuthenticated, controllerPayment.buyMoreVocabLookUpTurn);

module.exports = router;