const quizM = require('../models/quiz.m');
const answerM = require('../models/answer.m');
module.exports = {
    getExplaination: async (req, res, next) => {
        try {
            const access_token = req.session.user.access_token;
            const quiz_id = req.query.id;
            console.log(quiz_id);
            if (!access_token) {
                return res.status(401).json({ message: 'Access token is missing' });
            }
            
            const answerDetail = await answerM.getAnswer(access_token, quiz_id);
            res.json(answerDetail);

        } catch (error) {
            console.error('Error in getQuizDetail:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};
