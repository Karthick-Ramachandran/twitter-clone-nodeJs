const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = express.Router();
app.set('view engine', "pug");
app.set('views', "views");
app.use(bodyParser.urlencoded({extended: false}))
router.get('/', (req, res) => {
    res.status(200).render('auth/register');
});
router.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).render('auth/register');
});


module.exports = router