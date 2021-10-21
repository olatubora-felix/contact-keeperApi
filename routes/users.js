const express = require('express');

const router = express.Router();
//@Route POST api/users
//@Des   Register Users
//@Access  Public
router.post('/', (req, res) => {
    res.send('Register Users')
});

module.exports = router;