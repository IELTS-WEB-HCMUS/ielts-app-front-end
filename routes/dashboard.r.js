const router = require('express').Router();
const controllerDashboard = require('../controllers/dashboard.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerDashboard.getDashboard);

module.exports = router;