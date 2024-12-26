const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('forgot_password_page', { title: "Forget password page" });
});

router.post('/genotp', (req, res) => {
    req.session.email = req.body.email;
    const data = {
        type: "reset_password",
        email: req.body.email
    };

    fetch(process.env.API_GEN_OTP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => {
        if (result.data !== null) {
            res.render('verify_otp_code_page');
        } else {
            res.redirect('/user/forget_password');
        }
    }).catch(error => {
        console.error('Error when calling API:', error);
    });
});

router.post('/sendotp', (req, res) => {
    const data = {
        type: "reset_password",
        email: req.session.email,
        otp: req.body.otp
    };

    fetch(process.env.API_VERIFY_OTP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (!result.data) {
                throw new Error("OTP validation failed");
            }
            req.session.verify_token = result.data;
            res.render('set_new_password');
        }).catch(error => {
            console.error('Error when calling API:', error);
        });
});

router.post('/setnew', (req, res) => {
    const data = {
        email: req.session.email,
        new_password: req.body.password,
        verify_token: req.session.verify_token
    };
    console.log(data);

    fetch(process.env.API_RESET_PASS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => {
        console.log(result);
        if (result) {
            res.redirect('/user/auth/login');
        } else {
            res.redirect('/user/forget_password');
        }
    }).catch(error => {
        console.error('Error when calling API:', error);
    });
});

router.get('/', (req, res) => {
    res.render('registerpage', { title: "Register page" });
});

module.exports = router;