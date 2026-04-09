const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
mongoose.connect('mongodb://127.0.0.1:27017/shopeasy')
    .then(() => console.log("ShopEasy Database Connected!"))
    .catch(err => console.log("DB Connection Error:", err));

const Product = mongoose.model('Product', new mongoose.Schema({ 
    name: String, 
    price: Number 
}));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "https://www.youtube.com"],
            "img-src": ["'self'", "https://cdn.shopeasy.com"],
            "frame-src": ["'self'", "https://www.youtube.com"]
        },
    },
}));

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Please wait 15 minutes."
});

app.use(session({
    secret: 'shopeasy_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/shopeasy' }),
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 30 }
}));

app.get('/', (req, res) => {
    res.render('login', { error: null });
});


app.post('/login', loginLimiter, (req, res) => {
    const { user, pass } = req.body;
    if (user === 'admin' && pass === '123') {
        req.session.role = 'admin';
        res.redirect('/search');
    } else {
        res.send("Login Failed! <a href='/'>Try again</a>");
    }
});
app.get('/search', async (req, res) => {
    if (!req.session.role) return res.redirect('/'); // Auth Check
    
    let results = [];
    if (req.query.q) {
        results = await Product.find({ name: String(req.query.q) });
    }
    res.render('search', { products: results });
});
app.get('/reviews', (req, res) => {
    if (!req.session.role) return res.redirect('/');
    res.render('reviews', { cleanContent: null });
});

app.post('/review', (req, res) => {
    const rawReview = req.body.comment;
    const sanitized = DOMPurify.sanitize(rawReview);
    res.render('reviews', { cleanContent: sanitized });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));