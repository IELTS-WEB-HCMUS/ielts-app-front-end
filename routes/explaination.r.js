const router = require('express').Router();
const controllerExplaination = require('../controllers/explaination.c');
const { isAuthenticated } = require('../mws/checkLogin');

router.get('/', isAuthenticated, controllerExplaination.getExplaination);  
router.get('/test_explanation_page', isAuthenticated, (req, res) => {
    res.render('test_explanation_page', {layout: 'test_explanation', title: "Giải thích chi tiết"});
});

module.exports = router;