// Filename - posts.js
const mongoose = require('mongoose');
require('dotenv').config();
const mongoPassword = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://pinpot:${mongoPassword}@pinpot.ctzlg.mongodb.net/pinpot?retryWrites=true&w=majority&appName=PinPot`;

mongoose
    .connect(uri)
    .then(() => {})
    .catch(e => {
        console.log('Connection error:', e);
    });

const postSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: false,
        },
        location: {
            type: Object,
            required: true,
        },
        visibility: {
            type: String,
            required: true,
        },
        uploadDate: {
            type: Date,
            default: Date.now,
        },
        takenDate: {
            type: Date,
            required: false,
        },
        likes: {
            type: [String], // Array of user IDs who liked the post
            default: [], // Initialize as an empty array
        },
    },
    {
        collection: 'posts',
    },
);

const postsCol = mongoose.model('posts', postSchema);

module.exports = postsCol;
