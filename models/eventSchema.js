const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    guildID: { type: String, required: true },
    episodes: { type: Number, default: 0 }
})

module.exports = mongoose.model('eventSchema', eventSchema);