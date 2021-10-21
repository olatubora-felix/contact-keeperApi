const express = require('express');

const router = express.Router();
//@route GET api/auth
//@des   Get logged in user
//@access  private
router.get('/', (req, res) => {
    res.send('Get logged in user')
});

//@Route POST api/auth
//@Des   Log in user
//@Access  Public
router.post('/', (req, res) => {
    res.send('Log in user')
});

module.exports = router;