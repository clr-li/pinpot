const express = require('express');
const userCol = require('./db/user');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const postsCol = require('./db/posts');
const followCol = require('./db/follower');
const levenshtein = require('js-levenshtein');
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
        const user = await userCol.findOne({ username: username });

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
        const existingUser = await userCol.findOne({ username: username });

        if (existingUser) {
            res.send('Username already taken');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { username, password: hashedPassword, email };
            await userCol.insertMany([newUser]);
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

// Upload image
app.post('/upload-post', async (req, res) => {
    const { uid, postType, img, text, location, visibility, uploadDate, takenDate } = req.body;

    try {
        await postsCol.create({
            uid,
            postType,
            img,
            text,
            location,
            visibility,
            uploadDate,
            takenDate,
        });
        res.status(201).json('success');
    } catch (e) {
        res.send({ Status: 'error', data: e });
    }
});

// Get posts by uid
app.get('/get-post', async (req, res) => {
    const { uid } = req.query;

    try {
        await postsCol.find({ uid: uid }).then(data => {
            res.send({ status: 201, data: data });
        });
    } catch (e) {
        res.send({ Status: 'error', data: e });
    }
});

// Get posts by uid and location
app.get('/get-posts-by-loc', async (req, res) => {
    const { uid, lat, lon } = req.query;

    try {
        await postsCol.find({ uid: uid, 'location.lat': lat, 'location.lon': lon }).then(data => {
            res.send({ status: 201, data: data });
        });
    } catch (e) {
        res.send({ Status: 'error', data: e });
    }
});

// Get user by query
app.get('/search-users', async (req, res) => {
    const { search, limit = 5 } = req.query;

    try {
        const users = await userCol.find({}).exec();

        const results = users.map(user => ({
            ...user._doc, // spread to include all fields
            distance: levenshtein(search, user.username),
        }));

        results.sort((a, b) => a.distance - b.distance);
        const closestUsers = results.slice(0, parseInt(limit));

        res.send({ Status: 'success', data: closestUsers });
    } catch (e) {
        res.send({ Status: 'error', data: e });
    }
});

app.post('/follow-user', async (req, res) => {
    const { followedId, followerId } = req.body;

    if (!followerId || !followedId) {
        return res.status(400).send({ Status: 'error', data: 'User IDs are required.' });
    }

    try {
        // Check if the user is already following the target user
        const existingRelation = await followCol.findOne({ followerId, followedId: followedId });

        if (existingRelation) {
            return res.send({ Status: 'error', data: 'Already following this user.' });
        }

        // Create a new follow relationship
        const newRelation = new followCol({ followerId, followedId: followedId });
        await newRelation.save();

        res.status(201).send({ Status: 'success', data: 'User followed successfully.' });
    } catch (e) {
        res.send({ Status: 'error', data: e.message });
    }
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
