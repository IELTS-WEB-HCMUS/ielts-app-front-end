require('dotenv').config();
const express = require('express');
const path = require('path');
const { create } = require('express-handlebars');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

const hbs = create({
    extname: '.hbs',
    encoding: 'utf-8',
    defaultLayout: false,
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
});

const helpers = require('./helpers');
helpers.registerHelpers();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    if (!req.session.user) {
        res.render('homepage', { layout: 'homepage', title: "Trang chủ" });
    } else {
        res.render('homepage', { layout: 'homepage', title: "Trang chủ", name: req.session.user.profile.username, avatar: req.session.user.profile.avatar });
    }
});

const userLoginRouter = require('./routes/userLogin.r');
app.use('/user/auth', userLoginRouter);

const dashboardRouter = require('./routes/dashboard.r');
app.use('/user/dashboard', dashboardRouter);

const registerRouter = require('./routes/userRegister.r');
app.use('/user/register', registerRouter);

const forgetPasswordRouter = require('./routes/userForgetPassword.r');
app.use('/user/forget_password', forgetPasswordRouter);

const paymentRouter = require('./routes/payment.r');
app.use('/user/payment', paymentRouter);

const quizResultRouter = require('./routes/quizresult.r');
app.use('/user/quiz-result', quizResultRouter);

const fulltestRouter = require('./routes/fulltest.r');
app.use('/user/fulltest', fulltestRouter);

const vocabsRouter = require('./routes/vocabs.r');
app.use('/user/vocabs', vocabsRouter);

app.get('/about_us', (req, res) => {
    if (!req.session.user) {
        res.render('aboutuspage', { layout: 'aboutus', title: "Giới thiệu" });
    } else {
        res.render('aboutuspage', { layout: 'aboutus', title: "Giới thiệu", name: req.session.user.profile.username, avatar: req.session.user.profile.avatar });
    }
});

app.use(function (err, req, res, next) {
    res.status(500).send(err.stack);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});