const express = require('express');
const collection = require('./mongo');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to generate JWT
function generateToken(user) {
    return jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
    });
}

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await collection.findOne({ username: username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user);
            res.status(201).json({ token });
        } else {
            res.send('Invalid username or password');
        }
    } catch (e) {
        res.send('Error occurred');
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUser = await collection.findOne({ username: username });

        if (existingUser) {
            res.send('Username already taken');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { username, password: hashedPassword, email };
            await collection.insertMany([newUser]);
            res.status(201).json('User created');
        }
    } catch (e) {
        res.send('Error adding user');
    }
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/protected', authenticateToken, (req, res) => {
    res.json('This is a protected route');
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
