module.exports = {
    getStatistic: async (access_token, type) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            const response = await fetch(`${process.env.API_GET_STATISTIC}&type=${type}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch statistic: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in getStatistic:', error.message);
            throw new Error(`Error in getStatistic: ${error.message}`);
        }
    }
};
