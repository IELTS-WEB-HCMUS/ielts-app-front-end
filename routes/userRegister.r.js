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
        console.log(result);
        if (result.data !== null) {
            res.render('verify_otp_signup', { title: "Verify OTP code page", email: req.body.email });
        } else {
            res.redirect('/user/register');
        }
    }).catch(error => {
        console.error('Error when calling API:', error);
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
            if (!result.data) {
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

router.get('/', (req, res) => {
    res.render('registerpage', { title: "Register page" });
});

module.exports = router;