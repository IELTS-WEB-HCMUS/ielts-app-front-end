module.exports = {
    getVocabs: async (req, res, next) => {
        try {
            res.render('vocabs', {
                layout: 'vocabs', title: "Từ vựng", name:
                    req.session.user.profile.username, avatar: req.session.user.profile.avatar
            });
        } catch (error) {
            console.error('Error in getQuizResult:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};