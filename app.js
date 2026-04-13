const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const saltRounds = 12;


const users = []; 

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'your-very-strong-secret', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, 
        secure: false, 
        maxAge: 1000 * 60 * 30 
    }
}));

const isAuthenticated = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login');
};


app.get('/register', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        users.push({ username, password: hashedPassword });
        res.redirect('/login');
    } catch {
        res.status(500).send("Error registering user.");
    }
});

app.get('/login', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
    const user = users.find(u => u.username === req.body.username);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.regenerate(() => {
            req.session.user = user.username;
            res.redirect('/dashboard');
        });
    } else {
        // Proper error message: Don't leak if it was specifically the password or user
        res.send("Invalid credentials."); 
    }
});

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));