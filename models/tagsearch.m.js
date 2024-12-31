module.exports = {
    getTagSearch: async (access_token) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

            const response = await fetch(process.env.API_GET_TAG_SEARCH, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch tag search: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in getTagSearch:', error.message);
            throw new Error(`Error in getTagSearch: ${error.message}`);
        }
    }
};
