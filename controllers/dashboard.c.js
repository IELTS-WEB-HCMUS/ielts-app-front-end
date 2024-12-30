const userM = require('../models/userProfile.m');

module.exports = {
    getDashboard: async (req, res, next) => {
        try {
            const access_token = req.session.user.access_token;

            if (!access_token) {
                return res.status(401).json({ message: 'Access token is missing' });
            }
            const userProfile = await userM.getUserProfile(access_token);
            req.session.user.profile = {
                username: userProfile.data.email,
                avatar: userProfile.data.avatar,
                id: userProfile.data.id
            };

            res.render('dashboard', {
                layout: 'dashboard',
                title: "Dashboard",
                name: userProfile.data.email,
                avatar: userProfile.data.avatar
            });
        } catch (error) {
            console.error('Error in getProfile:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};
