module.exports = {
    getFulltest: async (req, res, next) => {
        try {
            res.render('fulltestpage', { layout: 'fulltest', title: "Full test", name: req.session.user.profile.username, avatar: req.session.user.profile.avatar });
        } catch (error) {
            console.error('Error in getFulltest:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};