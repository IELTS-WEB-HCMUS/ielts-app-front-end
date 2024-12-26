function isAuthenticated(req, res, next) {
    try {
        if (!req.session.user) {
            return res.redirect(302, '/user/auth/login');
        }

        //TODO: Fix later
        if (req.session.user.role) {
            if (req.session.user.role === 'premium') {
                req.isPremium = true;
            }
        } else {
            console.warn('User role is not defined.');
        }
        next();
    } catch (error) {
        console.error('Error in isAuthenticated middleware:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


module.exports = { isAuthenticated };