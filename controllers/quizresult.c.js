module.exports = {
    getQuizResult: async (req, res, next) => {
        try {
            res.render('quiz_result', { layout: 'quiz_result', title: "Kết quả làm bài", name: req.session.user.profile.username, avatar: req.session.user.profile.avatar });
        } catch (error) {
            console.error('Error in getQuizResult:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};