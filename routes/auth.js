const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth')

const router = express.Router();
//@route GET api/auth
//@des   Get logged in user
//@access  private
router.get('/', auth, async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    
});

//@Route POST api/auth
//@Des   Log in user
//@Access  Public
router.post('/', [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Password Credentials" }); 
        }

         const payload = {
            user: {
                id: user.id
            }
         }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Problem");
    }
});     

module.exports = router;