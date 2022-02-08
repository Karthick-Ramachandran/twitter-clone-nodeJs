const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const User = require('../models/UserSchema')
app.set('view engine', "pug");
app.set('views', "views");
app.use(bodyParser.urlencoded({extended: false}))

router.get('/', (req, res) => {
    if(req.session) {
        req.session.destroy(() => {
            return res.redirect('/login')
        })
    }
});


module.exports = router