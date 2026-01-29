const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
    experiencia: { type: Object, required: true } // Guardamos todo el objeto JSON del CV
});

module.exports = mongoose.model('CV', CVSchema);