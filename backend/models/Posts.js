const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Aquí guardaremos el HTML largo
    date: { type: String, required: true }
});

// Esto convierte el _id de Mongo a "id" normal para que React lo entienda
PostSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model('Post', PostSchema);