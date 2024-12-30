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
    }
};
