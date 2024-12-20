const router = require('express').Router();
const userC = require('../controllers/user.c');
const userM = require('../models/user.m');
const { google } = require('googleapis');
const crypto = require('crypto');
const url = require('url');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

router.get('/login/gg', (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

    const state = crypto.randomBytes(32).toString('hex');
    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        state: state,
    });

    res.redirect(authorizationUrl);
});

router.get('/gg', async (req, res) => {
    try {
        const q = url.parse(req.url, true).query;

        const { tokens } = await oauth2Client.getToken(q.code);

        const idToken = tokens.id_token;

        if (!idToken) {
            return res.status(400).send('Failed to retrieve id_token');
        }
        res.cookie('id_token', idToken, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error during OAuth2 callback:', error);
        res.status(500).send('Error during OAuth2 callback');
    }
});

router.get('/login', (req, res) => {
    res.render('loginpage', { title: "Login page" });
});

router.get('/register', (req, res) => {
    res.render('registerpage', { title: "Register page" });
});

router.get('/forgetpassword', (req, res) => {
    res.render('forgot_password_page', { title: "Forget password page" });
});
module.exports = router;
