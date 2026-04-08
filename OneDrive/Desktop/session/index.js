
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3000;
app.use(express.urlencoded({extended:true}))
app.use(express.json()); 
app.set('view engine','ejs')
app.use(session({
  secret: 'my_super_secret_development_key',
  resave: false,
  saveUninitialized: false
}));
app.get("/",(req,resp)=>{
    resp.render('login')
})
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'anuj' && password === '1234') {
    req.session.userId = 42; 
    req.session.userEmail = email;
    res.send('Login successful!'); 
  } else {
    res.status(401).send('Invalid credentials');
  }
});
app.get('/dashboard', (req, res) => {
  if (req.session.userEmail) {
    res.send(`Welcome back! Your email is ${req.session.userEmail} and your ID is ${req.session.userId}.`);
  } else {
    res.status(401).send('Unauthorized. Please log in first.');
  }
});
app.listen(3400)

