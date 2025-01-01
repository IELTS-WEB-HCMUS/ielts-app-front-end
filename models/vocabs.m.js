const { Auth } = require('googleapis');

module.exports = {
    getUserVocabsCategories: async (req) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

            const url = new URL(process.env.API_GET_VOCABS_CATEGORIES);
            url.searchParams.append('user_id', req.session.user.profile.id);

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${req.session.user.access_token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Failed to fetch user vocabs categories: ${response.status} ${response.statusText} - ${errorBody}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in getUserVocabsCategories:', error.message);
            throw new Error(`Error in getUserVocabsCategories: ${error.message}`);
        }
    },
    getUserVocabs: async (req, category) => {
        const category_id = req.query.category || category;
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

            const response = await fetch('http://localhost:8080/api/vocabs', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${req.session.user.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: parseInt(category_id), page: 1, limit: 10 })
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Failed to fetch vocabs: ${response.status} ${response.statusText} - ${errorBody}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in getVocabs:', error.message);
            throw new Error(`Error in getVocabs: ${error.message}`);
        }
    },
    Lookup: async (req, access_token) => {
        try {
            console.log('req.body:', req.body);
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            const response = await fetch('http://localhost:8080/api/ai/look-up-vocab', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quiz_id: parseInt(req.body.quiz_id),
                    sentence_index: parseInt(req.body.sentence_index),
                    vocab_index: parseInt(req.body.vocab_index),
                    word: req.body.word
                })
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Failed to fetch vocabs: ${response.status} ${response.statusText} - ${errorBody}`);
            }

            const data = await response.json();
            console.log('data:', data);
            return data;
        } catch (error) {
            console.error('Error in Lookup:', error.message);
            throw new Error(`Error in Lookup: ${error.message}`);
        }
    }
};    