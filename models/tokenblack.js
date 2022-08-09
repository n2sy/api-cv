const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('TokenBlack', tokenSchema);