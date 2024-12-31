const router = require('express').Router();

router.post('/newone', (req, res) => {
    req.session.info = req.body;
    const data = {
        type: "verify_email",
        email: req.body.email
    };

    console.log(req.session.info);

    fetch(process.env.API_GEN_OTP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => {
        if (result.code === 1 && result.error_detail === 'duplicated email') {
            res.redirect('/user/register?error=duplicated_email');
        } else if (result.data !== null) {
            res.render('verify_otp_signup', { title: "Verify OTP code page", email: req.body.email });
        } else {
            res.redirect('/user/register');
        }
    }).catch(error => {
        console.error('Error when calling API:', error);
        res.redirect('/user/register');
    });
});

router.post('/validate_otp', (req, res) => {
    const data = {
        type: "verify_email",
        email: req.body.email,
        otp: req.body.otp
    };

    console.log(data); 

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
                res.render('verify_otp_signup', { error: "Mã OTP không đúng. Vui lòng thử lại.", email: req.body.email });
            } 
            else if (result.code === 1 && result.error_detail === "OTP expired") {
                res.render('verify_otp_signup', { error: "Mã OTP đã hết hạn. Vui lòng gửi lại mã OTP.", email: req.body.email });
            }
            else if (!result.data) {
                throw new Error("OTP validation failed");
            }

            const nameParts = req.session.info.name.split(" ");
            const lastName = nameParts.pop() || "";
            const firstName = nameParts.join(" ");

            const data1 = {
                email: req.session.info.email,
                password: req.session.info.password1,
                role: "END_USER",
                verify_token: result.data,
                first_name: firstName,
                last_name: lastName
            };

            console.log(data1);

            return fetch(process.env.API_SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data1)
            });
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (!result.data) {
                throw new Error("Signup failed");
            }

            res.redirect('/user/auth/login');
        })
        .catch(error => {
            console.error('Error:', error.message);
            res.render('verify_otp_signup', {
                title: "Verify OTP Code Page Again",
                email: req.body.email,
                errorMessage: error.message || "Something went wrong"
            });
        });
});

router.post('/resendotp', (req, res) => {
    const email = req.body.email;
    const data = {
        type: "verify_email",
        email: email
    };

    fetch(process.env.API_GEN_OTP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => {
        console.log(result);
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

router.get('/', (req, res) => {
    res.render('registerpage', { title: "Register page" });
});

module.exports = router;