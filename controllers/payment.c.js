module.exports = {
    getPayment: async (req, res, next) => {
        try {
            res.render('payment_page', { layout: 'dashboard', title: "Thanh toán", name: req.session.user.profile.username, avatar: req.session.user.profile.avatar });
        } catch (error) {
            console.error('Error in getPayment:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    buyMoreVocabLookUpTurn: async (req, res) => {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

            const url = new URL(process.env.API_BUY_MORE_VOCAB_LOOKUP_TURN);

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${req.session.user.access_token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Failed to create order for buying more vocab lookup turn: ${errorBody}`);
            }

            const data = await response.json();
            console.log(data);
            res.json({ order_url: data.order_url });
        } catch (error) {
            console.error('Error in buyMoreVocabLookUpTurn:', error.message);
            throw new Error(`Error in buyMoreVocabLookUpTurn: ${error.message}`);
        }
    },
};
