const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser')
const middleware = require('./middleware')
const path = require('path')
app.set('view engine', "pug");
app.set('views', "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}))

// routes
const loginRoutes = require('./routes/loginRoutes')
const registerRoutes = require('./routes/registerRoutes')

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

app.get('/', middleware.requireLogin, (req, res) => {
    var payload = {
        pageTitle: "Home is here"
    }
    res.status(200).render('home', payload);
});



app.listen(port, () => {
    console.log(`server running on port ${port}`)
});
