const tagsearchM = require('../models/tagsearch.m');
const quizM = require('../models/quiz.m');

module.exports = {
    getFulltest: async (req, res, next) => {
        const access_token = req.session.user.access_token;
        if (!access_token) {
            return res.status(401).json({ message: "Access token is missing" });
        }

        try {
            const tagsearch = await tagsearchM.getTagSearch(access_token);
            const fullquiz = await quizM.getFullQuiz(access_token, req);

            const totalPages = Math.ceil(fullquiz.data.total / (req.query.page_size || 6));
            const currentPageData = fullquiz.data.items;

            if (req.xhr) {  // Check if the request is AJAX
                return res.render("partials/fulltest", {
                    tagpassage: tagsearch.data[2].tags,
                    taglevel: tagsearch.data[4].tags,
                    fullquiz: currentPageData,
                    totalpage: totalPages,
                    pages: Array.from({ length: totalPages }, (_, i) => i + 1),
                });
            }

            res.render("fulltestpage", {
                layout: "fulltest",
                title: "Full test",
                name: req.session.user.profile.username,
                avatar: req.session.user.profile.avatar,
                tagpassage: tagsearch.data[2].tags,
                taglevel: tagsearch.data[4].tags,
                fullquiz: currentPageData,
                totalpage: totalPages,
                pages: Array.from({ length: totalPages }, (_, i) => i + 1),
            });
        } catch (error) {
            console.error("Error in getFulltest:", error.message);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
};
