const quizM = require('../models/quiz.m');
const vocabM = require('../models/vocabs.m');
module.exports = {
    getDotestPage: async (req, res, next) => {
        try {
            const access_token = req.session.user.access_token;
            if (!access_token) {
                return res.status(401).json({ message: 'Access token is missing' });
            }

            res.render('dotestpage',
                {
                    layout: 'dotest',
                    title: "Làm bài"
                });

        } catch (error) {
            console.error('Error in getProfile:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }, 
    fetchQuizDetail: async (req, res, next) => {
        try {
            const access_token = req.session.user.access_token;
            const quiz_id = req.query.id;
            if (!access_token) {
                return res.status(401).json({ message: 'Access token is missing' });
            }

            const quizDetail = await quizM.getDetailQuiz(access_token, quiz_id);
            res.json(quizDetail);

        } catch (error) {
            console.error('Error in getQuizDetail:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }, 
    submitQuiz: async (req, res, next) => {
        try {
            const access_token = req.session.user.access_token;
            const quiz_id = req.query.id;
            if (!access_token) {
                return res.status(401).json({ message: 'Access token is missing' });
            }

            const quizDetail = await quizM.submitQuizResult(req, access_token, quiz_id);
            res.json(quizDetail);

        } catch (error) {
            console.error('Error in submit:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }, 
    fetchLookupVocab: async (req, res) => {
        try {
            const access_token = req.session.user.access_token;
            if (!access_token) {
                return res.status(401).json({ message: 'Access token is missing' });
            }

            const vocabDetail = await vocabM.Lookup(req, access_token);
            res.json(vocabDetail);

        } catch (error) {
            console.error('Error in FetchLookupVocab:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};
