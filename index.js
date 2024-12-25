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
    req.session.user = null;
    res.render('homepage', { layout: 'homepage', title: "Trang chủ" });
});

const userRouter = require('./routes/user.r');
app.use('/user', userRouter);

const userInfoRouter = require('./routes/user_info.r');
app.use('/user_info', userInfoRouter);

app.get('/vocals', (req, res) => {
    res.render('vocals', { layout : 'vocals', title: "Từ vựng" });
});

app.get('/filter', (req, res) => {
    res.render('filterpage', { layout : 'filter', title: "Dashboard" });
});

app.use(function (err, req, res, next){
    res.status(500).send(err.stack);
});

app.get('/payment', (req, res) => {
    res.render('payment_page', {layout: 'payment', title: "Thanh toán"});
});

app.get('/quiz-result', (req, res) => {
    res.render('quiz_result', {layout: 'quiz_result', title: "Kết quả làm bài"});
});

app.get('/about_us', (req, res) => {
    if (!req.session.user) {
        res.render('aboutuspage', {layout: 'aboutus', title: "Giới thiệu"});
    } else {
        res.render('aboutuspage', {layout: 'aboutus', title: "Giới thiệu", name: req.session.user.profile.last_name, avatar: req.session.user.profile.avatar});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});