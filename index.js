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
    layoutsDir:  __dirname + '/views/layouts',
    partialsDir:  __dirname + '/views/partials'
 });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('homepage', { layout: 'homepage', title: "Trang chủ" });
});

app.get('/about_us', (req, res) => {
    res.render('aboutuspage', {layout: 'aboutus', title: "Giới thiệu"});
});

const userRouter = require('./routes/user.r');
app.use('/user', userRouter);

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { layout : 'dashboard', title: "Dashboard" });
});

app.get('/vocals', (req, res) => {
    res.render('vocals', { layout : 'vocals', title: "Từ vựng" });
});

app.get('/filter', (req, res) => {
    res.render('filterpage', { layout : 'filter', title: "Dashboard" });
});

app.get('/resetpassword', (req, res) => {
    res.render('verify_otp_code_page');
});

app.get('/setnewpassword', (req, res) => {
    res.render('set_new_password');
});

app.use(session({   
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(function (err, req, res, next){
    res.status(500).send(err.stack);
});

app.get('/payment', (req, res) => {
    res.render('payment_page', {layout: 'payment', title: "Thanh toán"});
});

app.get('/quiz-result', (req, res) => {
    res.render('quiz_result', {layout: 'quiz_result', title: "Kết quả làm bài"});
});

app.get('/dotestpage', (req, res) => {
    res.render('dotestpage', {layout: 'dotest', title: "Làm bài"});
});

app.get('/test_explanation_page', (req, res) => {
    res.render('test_explanation_page', {layout: 'test_explanation', title: "Giải thích chi tiết"});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});