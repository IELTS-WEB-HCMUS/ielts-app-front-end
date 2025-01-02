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
        console.log(result)
        if (result.code === 1 && result.error_detail === "email not found") {
            res.redirect('/user/forget_password?error=email_not_found');
        } else if (result.code === 1 && result.error_detail === "google account can't reset password") {
            res.redirect('/user/forget_password?error=google_account_can_not_reset_password');
        } else if (result.data !== null) {
            res.render('verify_otp_code_page');
        } else {
            res.redirect('/user/forget_password');
        }
    }).catch(error => {
        console.error('Error when calling API:', error);
    });
});

router.post('/sendotp', (req, res) => {
    console.log(req.body);
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
            console.log(result);
            if (result.code === 1 && result.error_detail === "invalid OTP") {
                res.render('verify_otp_code_page', { error: "Mã OTP không đúng. Vui lòng thử lại.", email: req.session.email });
            } else if (result.code === 1 && result.error_detail === "OTP expired") {
                res.render('verify_otp_code_page', { error: "Mã OTP đã hết hạn. Vui lòng gửi lại mã OTP.", email: req.session.email });
            } else if (!result.data) {
                res.render('verify_otp_code_page', { error: "Mã OTP không đúng. Vui lòng thử lại." });
            } else {
                req.session.verify_token = result.data;
                res.render('set_new_password');
            }
        }).catch(error => {
            console.error('Error when calling API:', error);
            res.render('verify_otp_code_page', { error: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
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
        console.log(result)
        if (result.code === 1 && result.error_detail === 'password duplicated') {
            res.render('set_new_password', { error: "Mật khẩu mới không được trùng với mật khẩu cũ." });
        } else if (result) {
            res.redirect('/user/auth/login');
        } else {
            res.redirect('/user/forget_password');
        }
    }).catch(error => {
        console.error('Error when calling API:', error);
        res.render('set_new_password', { error: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
    });
});

router.get('/', (req, res) => {
    res.render('registerpage', { title: "Register page" });
});

router.post('/resendotp', (req, res) => {
    const data = {
        type: "reset_password",
        email: req.session.email
    };

    fetch(process.env.API_GEN_OTP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => {
        if (result.data !== null) {
            res.status(200).send({ success: true });
        } else {
            res.status(400).send({ success: false });
        }
    }).catch(error => {
        console.error('Error when calling API:', error);
        res.status(500).send({ success: false });
    });
});

module.exports = router;