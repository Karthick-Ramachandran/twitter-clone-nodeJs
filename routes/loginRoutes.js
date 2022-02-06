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
    res.status(200).render('auth/login');
});
router.post('/', async (req, res) => {
    try {
        const body = req.body;
        let payload = req.body;
        if(req.body.logUserName && req.body.logPassword) {
        const user = await User.findOne({
            $or: [
                { "userName" : body.logUserName },
                { "email": body.logUserName }
            ]
        });
        if(user !== null) {
            const result = await bcrypt.compare(req.body.logPassword, user.password);
            if(result === true) {
                req.session.user = user;
                return res.redirect('/')
            }
            payload.error = "Invalid credentials"
            return res.status(200).render('auth/login', payload);
        } else {
            payload.error = "Account with given username/email not found"
            return res.status(200).render('auth/login', payload);
        }
    } else {
        payload.error = "Please provide required details"
        return res.status(200).render('auth/login', payload);
    }
    } catch(err) {
        console.log(err);
        res.redirect('/error')
    }
    
});

module.exports = router