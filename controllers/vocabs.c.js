const vocabsCategoriesM = require('../models/vocabsCategories.m');

module.exports = {
    getVocabsCategories: async (req, res, next) => {
        try {
            const topics = await vocabsCategoriesM.getUserVocabsCategories(req);
            console.log('topics:', topics);
            res.render('vocabs', {
                layout: 'vocabs',
                title: "Từ vựng",
                name: req.session.user.profile.username,
                avatar: req.session.user.profile.avatar,
                topics: topics.data
            });
        } catch (error) {
            console.error('Error in getVocabsCategories:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    updateTopic: async (req) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            const response = await fetch(process.env.API_UPDATE_VOCABS_CATEGORIES, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${req.session.user.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: req.body.topic_id, new_name: req.body.new_name })
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch update vocabs categories: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in updateTopic:', error.message);
            throw new Error(`Error in updateTopic: ${error.message}`);
        }
    }
};    
