const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const middleware = require('../middleware');
const Post = require('../models/PostSchema');
const User = require('../models/UserSchema');
app.use(bodyParser.urlencoded({ extended: false }))

router.get('/', middleware.requireLogin, async (req, res, next) => {
    try {
        let posts = await Post.find().populate("postedBy")
        return res.json({
            code: 200,
            data: posts
        })
    } catch (err) {
        console.log(err);
    }

});

router.post('/', middleware.requireLogin, async (req, res, next) => {
    try {
        if (!req.body.content) {
            return res.json({
                code: 400,
                message: "Content is required"
            })
        }

        let postData = {
            content: req.body.content,
            postedBy: req.session.user._id
        }
        let newPost = await Post.create(postData);
        newPost = await User.populate(newPost, { path: "postedBy" })
        return res.json({
            code: 201,
            data: newPost
        })
    } catch (err) {
        console.log(err);
    }
})


module.exports = router