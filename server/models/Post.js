const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: String
});


module.exports = mongoose.model('Posts', PostSchema);