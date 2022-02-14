const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: {
        type: String,
        trim: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    pinned: {
        type: Boolean
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;