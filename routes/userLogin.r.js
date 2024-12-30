const router = require('express').Router();
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

        const response = await fetch(process.env.API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token: idToken })
        });

        const result = await response.json();

        req.session.user = { access_token: result.data };
        res.redirect('/user/dashboard');

    } catch (error) {
        console.error('Error during OAuth2 callback:', error);
        res.status(500).send('Error during OAuth2 callback');
    }
});

router.post('/loginAuth', async (req, res) => {
    try {
        const response = await fetch(process.env.API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: req.body.email,
                password: req.body.password
            }),
        });

        if (response.status === 400) {
            return res.status(400).redirect('/user/auth/login?error=true');
        }
        const result = await response.json();
        req.session.user = { access_token: result.data };
        res.redirect('/user/dashboard');
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/login', (req, res) => {
    res.render('loginpage', { title: "Login page" });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during session destroy:', err);
        }
        res.redirect('/');
    });
});

module.exports = router;
