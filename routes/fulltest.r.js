const router = require('express').Router();
const controllerFulltest = require('../controllers/fulltest.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerFulltest.getFulltest);

module.exports = router;