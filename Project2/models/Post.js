import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    user: {
        type: 'ObjectId',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    }
    body: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('post', PostSchema);

export default Post;