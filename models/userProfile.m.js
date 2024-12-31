module.exports = {
    getUserProfile: async (access_token) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

            const response = await fetch(process.env.API_GET_USER_PROFILE, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user profile: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in getUserProfile:', error.message);
            throw new Error(`Error in getUserProfile: ${error.message}`);
        }
    }, 
    getUserTarget: async (access_token) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

            const response = await fetch(process.env.API_GET_TARGET, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch target: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in getTarget:', error.message);
            throw new Error(`Error in getTarget: ${error.message}`);
        }
    }
};
