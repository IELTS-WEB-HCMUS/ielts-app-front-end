module.exports = {
    getSuggestQuiz: async (access_token) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

            const response = await fetch(process.env.API_GET_QUIZS, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch suggest quiz: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in getSuggestQuiz:', error.message);
            throw new Error(`Error in getSuggestQuiz: ${error.message}`);
        }
    }, 
    getFullQuiz: async (access_token, req) => {
        try {
            const page = req.query.page || 1;   
            const page_size = req.query.page_size || 3;
            const mode = req.query.mode || 1;
            const submitted_status = req.query.submitted_status || 0;
            const tag_passage = req.query.tagpassage || 1;
            const tag_question_type = req.query.taglevel || 1;
            const search = req.query.search || '';
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            const response = await fetch(`http://localhost:8080/v1/quizzes?page=${page}&page_size=${page_size}&type=1&mode=${mode}&submitted_status=${submitted_status}&tag_passage=${tag_passage}&tag_question_type=${tag_question_type}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch full quiz: ${response.statusText}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in getFullQuiz:', error.message);
            throw new Error(`Error in getFullQuiz: ${error.message}`);
        }
    }    
};
