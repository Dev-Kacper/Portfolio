const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const asyncHandler = require('express-async-handler')

const assycMiddleware = handler => (req, res, next) => {
    Promise
        .resolve(handler(req, res, next))
        .catch(next)
}

router.get('/', assycMiddleware(async (req, res, next) => {
    const post = await Post.find();
    return post ? res.send(post) : res.sendStatus(404);
}));

router.post('/', assycMiddleware(async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text
    });
    await post.save();
    return post ? res.send(post) : res.sendStatus(404);
}));
//Searching by id
router.get('/:postId', assycMiddleware(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    return post ? res.send(post) : res.sendStatus(404);
}));

//delete specific post
router.delete('/:postId', assycMiddleware(async (req, res, next) => {
    const removedPost = await Post.deleteMany({ _id: req.params.postId })
    return removedPost ? res.send(removedPost) : res.sendStatus(404);
}));

//update
router.patch('/:postId', assycMiddleware(async (req, res, next) => {
    const editedPost = await Post.updateOne({ _id: req.params.postId }, 
        { $set: 
            { 
                title: req.body.title,
                text: req.body.text 
            }
        });
    return editedPost ? res.send(editedPost) : res.sendStatus(404);
}));

module.exports = router;