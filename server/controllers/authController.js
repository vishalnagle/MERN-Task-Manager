const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); //to generate signed token
const {expressjwt} = require('express-jwt'); //for authorization check
// const { errorHandler } = require('../helpers/dbErrorHandlers');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    // Check if required fields are present in the request
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email, and password.' });
    }

    const user = new User({
        name,
        email,
        password // Assuming password is sent in the request body
        // Other fields as required...
    });

    user.save()
        .then(savedUser => {
            savedUser.salt = undefined;
            savedUser.hashed_password = undefined;
            res.json({ user: savedUser });
        })
        .catch(err => {
            if (err.code === 11000 || err.message.includes('duplicate key error')) {
                return res.status(400).json({ error: 'Email is already taken' });
            }
            return res.status(400).json({ error: err.message });
        });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'User with given email does not exist. Please Signup.' });
            }

            if (!user.authenticate(password)) {
                return res.status(401).json({ error: 'Email and password do not match' });
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.cookie('t', token, { expire: new Date() + 9999 });

            const { _id, name, email } = user;
            return res.json({ token, user: { _id, name, email } });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        });
};



exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success.'});
};

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'], // Specify the algorithm used to sign the token
    userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};
