const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

// User Model
const User = require('../models/User');
const Contact = require('../models/Contact');

const router = express.Router();

//@Route Get api/cosntacts
//@Des   Get all users contacts
//@Access private
router.get('/',  auth, async (req, res) => {
   try {
     const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
     res.json(contacts)
   } catch (err) {
     console.error(err.message);
     res.status(500).send("Server Error");
   }
});

//@Route POST api/cosntact
//@Des   Add new Contact
//@Access private
router.post('/', [auth, [
  body('name', 'Name is required')
  .not().isEmpty()
]], async (req, res) => {

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  const { name, email, phone, type } = req.body;
  try {
     let oldcontact = await Contact.findOne({ email });
        if (oldcontact) {
            return res.status(400).json({ msg: "Contact Email already exist" });
        }
    const newContact = new Contact({
    name,
    email,
    phone,
    type,
    user: req.user.id 
    
  });

  const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@Route PUT api/cosntact/:id
//@Des Update user Contact
//@Access  private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).json({ msg: "Contact not found" });
    // Make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(req.params.id,
      { $set: contactFields },
    {new: true});
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Erroe");
  }
});

//@Route DELETE api/cosntact/:id
//@Des Update user Contact
//@Access  private
router.delete('/:id', auth, async (req, res) => {
   try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).json({ msg: "Contact not found" });
    // Make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({msg: "Contact Removed"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Erroe");
  }

});

module.exports = router;