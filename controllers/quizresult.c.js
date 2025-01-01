const answerM = require('../models/answer.m');
module.exports = {
    getQuizResult: async (req, res, next) => {
        try {
            const access_token = req.session.user.access_token;
            if (!access_token) {
                return res.status(401).json({ message: 'Access token is missing' });
            }

            const quizResult = await answerM.getAnswer(access_token, req.query.id);

            const total = quizResult.data.summary.total;
            const correct = quizResult.data.summary.correct;
            const notdo = total - quizResult.data.detail[0].length;
            const wrong = total - correct - notdo;
            const answer = quizResult.data.detail[0];
            const time = quizResult.data.completed_duration;

            res.render('quiz_result', {
                layout: 'quiz_result',
                title: "Kết quả làm bài",
                name: req.session.user.profile.username,
                avatar: req.session.user.profile.avatar,
                total: total,
                correct: correct,
                wrong: wrong,
                notdo: notdo,
                answers: answer,
                time: time
            });

            console.log(quizResult.data.detail[0]);

        } catch (error) {
            console.error('Error in getResult:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};