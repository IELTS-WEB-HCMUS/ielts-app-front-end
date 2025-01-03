const vocabsCategoriesM = require('../models/vocabs.m');

module.exports = {
    getVocabsCategories: async (req, res, next) => {
        try {
            const topics = await vocabsCategoriesM.getUserVocabsCategories(req);
            const category = parseInt(req.query.category) || 1;
            const vocals = await vocabsCategoriesM.getUserVocabs(req, category);
            console.log(vocals.data.vocabularies);
            res.render('vocabs', {
                layout: 'vocabs',
                title: "Từ vựng",
                name: req.session.user.profile.username,
                avatar: req.session.user.profile.avatar,
                topics: topics.data,
                vocabs: vocals.data.vocabularies,
                category: category
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
    },
    deleteVocab: async (req, res) => {
        try {
            const id = req.body.id;
            console.log(id);
            if (!id) {
                throw new Error('ID không hợp lệ');
            }

            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            const response = await fetch(`http://localhost:8080/api/vocabs/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${req.session.user.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                throw new Error(`Lỗi khi xóa từ vựng: ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Lỗi trong deleteVocab:', error.message);
            throw new Error(`Lỗi khi xóa từ vựng: ${error.message}`);
        }
    },
    addVocabs: async (req, res) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            // Build the payload dynamically, including only non-empty fields
            const payload = {
                category: parseInt(req.body.category),
                value: req.body.value,
                word_class: req.body.word_class,
            };

            if (req.body.ipa) payload.ipa = req.body.ipa;
            if (req.body.meaning) payload.meaning = req.body.meaning;
            if (req.body.example) payload.example = req.body.example;
            if (req.body.note) payload.note = req.body.note;

            const response = await fetch('http://localhost:8080/api/vocabs/add', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${req.session.user.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Lỗi khi thêm từ vựng: ${response.statusText}`);
            }
            res.redirect('/user/vocabs');
        } catch (error) {
            console.error('Lỗi trong addVocabs:', error.message);
            throw new Error(`Lỗi khi thêm từ vựng: ${error.message}`);
        }
    }, 
    updateVocab: async (req, res) => {
        try {
            console.log(req.body);
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            const response = await fetch('http://localhost:8080/api/vocabs/update', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${req.session.user.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: parseInt(req.body.id, 10),
                    value: req.body.value,
                    meaning: req.body.meaning,
                    example: req.body.example,
                    note: req.body.note,
                    status: req.body.status,
                    word_class: req.body.wordClass
                })
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`Lỗi khi thêm từ vựng: ${response.statusText}`);
            }
            res.redirect('/user/vocabs');
        } catch (error) {
            console.error('Lỗi trong addVocabs:', error.message);
            throw new Error(`Lỗi khi thêm từ vựng: ${error.message}`);
        }
    }

};    
