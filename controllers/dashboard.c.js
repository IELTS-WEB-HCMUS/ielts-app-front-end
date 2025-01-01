const userM = require('../models/userProfile.m');
const quizM = require('../models/quiz.m');
const statisticM = require('../models/statistic.m');
module.exports = {
    getDashboard: async (req, res, next) => {
        try {
            const access_token = req.session.user.access_token;
            const type = req.query.type || 1;
            if (!access_token) {
                return res.status(401).json({ message: 'Access token is missing' });
            }
            const userProfile = await userM.getUserProfile(access_token);
            const userTarget = await userM.getUserTarget(access_token);
            const suggestQuiz = await quizM.getSuggestQuiz(access_token);
            const statistic = await statisticM.getStatistic(access_token, type);
            const overallScore = (userTarget.data.TargetListening + userTarget.data.TargetReading + userTarget.data.TargetSpeaking + userTarget.data.TargetWriting) / 4;
            const suggestQuizList = suggestQuiz.data.items.filter(quiz => 
                Math.abs(quiz.level - overallScore) <= 0.5
            );         

            const statisticList = statistic.data.items.filter(statistic => statistic);  
            req.session.user.profile = {
                username: userProfile.data.last_name,
                avatar: userProfile.data.avatar,
                id: userProfile.data.id
            };

            const exam_date = new Date(userTarget.data.NextExamDate).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            res.render('dashboard', {
                layout: 'dashboard',
                title: "Dashboard",
                name: userProfile.data.last_name,
                avatar: userProfile.data.avatar,
                targetuser: userTarget.data,
                exam_date: exam_date,
                access_token: req.session.user.access_token,
                suggestQuizList: suggestQuizList, 
                statistic: statisticList
            });
        } catch (error) {
            console.error('Error in getProfile:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    updateTarget: async (req) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
    
            // Trích xuất và chuyển đổi dữ liệu từ req.body
            const { allScores, examDate } = req.body;
    
            // Chuyển examDate sang định dạng yyyy-mm-dd
            const [day, month, year] = examDate.split('/'); // Giả định examDate là '15/01/2025'
            const formattedExamDate = `${year}-${month}-${day}`; // Kết quả: '2025-01-15'
    
            const response = await fetch(process.env.API_GET_TARGET, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${req.session.user.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    target_listening: parseFloat(allScores.TargetListening),
                    target_reading: parseFloat(allScores.TargetReading),
                    target_speaking: parseFloat(allScores.TargetSpeaking),
                    target_writing: parseFloat(allScores.TargetWriting),
                    next_exam_date: formattedExamDate
                })
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch update target: ${response.statusText}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in updateTarget:', error.message);
            throw new Error(`Error in updateTarget: ${error.message}`);
        }
    }
};
