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
    res.render('homepage', { layout: 'homepage', title: "Homepage" });
});

app.get('/about_us', (req, res) => {
    res.render('aboutuspage', {layout: 'aboutus', title: "About us"});
});

const userRouter = require('./routes/user.r');
app.use('/user', userRouter);

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'views/loginpage.html'));
// });

// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'views/registerpage.html'));
// });

// app.get('/aboutus', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'views/aboutuspage.html'));
// });

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { layout : 'dashboard', title: "Dashboard" });
});

app.get('/vocals', (req, res) => {
    res.render('vocals', { layout : 'vocals', title: "vocals" });
});

app.get('/filter', (req, res) => {
    res.render('filterpage', { layout : 'filter', title: "Dashboard" });
});

app.use(session({   
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(function (err, req, res, next){
    res.status(500).send(err.stack);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});