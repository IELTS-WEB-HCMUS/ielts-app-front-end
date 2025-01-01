module.exports = {
    getAnswer: async (access_token, id) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            const response = await fetch(`http://localhost:8080/v1/answers/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch answer: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('data:', data);
            return data;
        } catch (error) {
            console.error('Error in getAnswer:', error.message);
            throw new Error(`Error in getAnswer: ${error.message}`);
        }
    }
};
