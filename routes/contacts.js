const express = require('express');

const router = express.Router();

//@Route Get api/cosntacts
//@Des   Get all users contacts
//@Access private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

//@Route POST api/cosntact
//@Des   Add new Contact
//@Access private
router.post('/', (req, res) => {
  res.send('Add Contact');
});

//@Route PUT api/cosntact/:id
//@Des Update user Contact
//@Access  private
router.put('/:id', (req, res) => {
  res.send('Update Contact');
});

//@Route DELETE api/cosntact/:id
//@Des Update user Contact
//@Access  private
router.delete('/:id', (req, res) => {
  res.send('Delete Contact');
});

module.exports = router;