const Contact = require('../models/contactModel');

// Create Contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, userId } = req.body;
    const contact = new Contact({ name, email, phone, userId });
    await contact.save();
    res.status(201).json({ message: "Contact created successfully", contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Contact
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 