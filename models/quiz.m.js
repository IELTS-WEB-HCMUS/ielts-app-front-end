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
            const page_size = req.query.page_size || 6;
            const mode = req.query.mode || 1;
            const submitted_status = req.query.submitted_status || null;
            const tag_passage = req.query.tagpassage || null;
            const tag_question_type = req.query.taglevel || null;
            const search = req.query.search || '';
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            
            let url = `http://localhost:8080/v1/quizzes?page=${page}&page_size=${page_size}&type=1&mode=${mode}&search=${search}`;
            if (submitted_status) {
                url += `&submitted_status=${submitted_status}`;
            }
            if (tag_passage) {
                url += `&tag_passage=${tag_passage}`;
            }
            if (tag_question_type) {
                url += `&tag_question_type=${tag_question_type}`;
            }
            
            const response = await fetch(url, {
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
    }, 
    getDetailQuiz: async (access_token, quiz_id) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            const response = await fetch(`http://localhost:8080/v1/quizzes/${quiz_id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch detail quiz: ${response.statusText}`);
            }
    
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error in getDetailQuiz:', error.message);
            throw new Error(`Error in getDetailQuiz: ${error.message}`);
        }
    }, 
    submitQuizResult: async (req, access_token, quiz_id) => {
        try {
            const requestBody = {
                question: req.body.result.question,
                answer: {
                    detail: req.body.result.dictionary,
                    ...req.body.result.quiz,
                },
            };
              
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
            const response = await fetch(`http://localhost:8080/v1/quizzes/${quiz_id}/answer`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Failed to submit quiz: ${response.statusText}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in submitQuizResult:', error.message);
            throw new Error(`Error in submitQuizResult: ${error.message}`);
        }
    }
};
