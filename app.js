const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser')
const session = require('express-session');
const middleware = require('./middleware')
const path = require('path')

const mongoose = require('./connections/database')
app.set('view engine', "pug");
app.set('views', "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret: "karaikudi chicken",
    resave: true,
    saveUninitialized: false
}))
// routes
const loginRoutes = require('./routes/loginRoutes')
const registerRoutes = require('./routes/registerRoutes')
const logoutRoutes = require('./routes/logoutRoutes')

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logoutRoutes);
app.get('/', middleware.requireLogin, (req, res) => {
    var payload = {
        pageTitle: "Home",
        user: req.session.user
    }
    res.status(200).render('home', payload);
});


app.get('/error', (req, res) => {
    res.render('error');
})
app.listen(port, () => {
    console.log(`server running on port ${port}`)
});
