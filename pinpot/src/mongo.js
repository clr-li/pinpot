const mongoose = require('mongoose');
require('dotenv').config();
const mongoPassword = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://pinpot:${mongoPassword}@pinpot.ctzlg.mongodb.net/?retryWrites=true&w=majority&appName=PinPot`;
mongoose
    .connect(uri)
    .then(() => {
        console.log('mongodb connected');
    })
    .catch(e => {
        console.log('failed');
    });

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const collection = mongoose.model('users', newSchema);

module.exports = collection;
