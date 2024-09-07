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

const newSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: true, // Index for text search
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'users',
    },
);

// Create a text index on the username field
newSchema.index({ username: 'text' });

const userCol = mongoose.model('users', newSchema);

module.exports = userCol;
