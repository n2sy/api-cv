const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    prenom: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    avatar: {
        name: String,
        data: Buffer,
        contentType: String
    },
    status: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Personne', personSchema);

