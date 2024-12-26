module.exports = {
    getPayment: async (req, res, next) => {
        try {
            res.render('payment_page', { layout: 'dashboard', title: "Thanh toán", name: req.session.user.profile.username, avatar: req.session.user.profile.avatar });
        } catch (error) {
            console.error('Error in getPayment:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};
