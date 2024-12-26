const router = require('express').Router();
const controllerPayment = require('../controllers/payment.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerPayment.getPayment);

module.exports = router;