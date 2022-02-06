const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/UserSchema')
app.set('view engine', "pug");
app.set('views', "views");
app.use(bodyParser.urlencoded({extended: false}))
router.get('/', (req, res) => {
    res.status(200).render('auth/register');
});
router.post('/', async (req, res) => {
    try{
    const body = req.body;
    const firstName = body.firstName.trim();
    const lastName = body.lastName.trim();
    const userName = body.userName.trim();
    const email = body.email.trim();
    const password = body.password;
    let payload = req.body;
    if(firstName && lastName && userName && email && password) {
        const user = await User.findOne({
            $or: [
                { "userName" : userName },
                { "email": email }
            ]
        });
        if(user == null) {
            let data = req.body
            data.password = await bcrypt.hash(password, 10) 
            User.create(data).then(user => {
                req.session.user = user;
                return res.redirect('/')
            })
        } else {
            if(userName == user.userName) {
                payload.error = "Username already in use"
            } else {
                payload.error = "Email already in use"
            }
            res.status(200).render('auth/register', payload);
        }
        
    } else {
        payload.error = "Please fill all the fields"
        res.status(200).render('auth/register', payload);
    }
    
    } catch(err) {
        console.log(err);
        res.redirect('/error')
    }
});


module.exports = router