const router = require('express').Router();
const controllerU = require('../controllers/user_info.c');

router.use((req, res, next) => {
    if (!req.session.user) {
        return res.redirect(302,'/user/login');
    } else {
        next();
    }
});

router.get('/profile', controllerU.getProfile);

module.exports = router;