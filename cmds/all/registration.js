const Discord = require("discord.js");
const eventSchema = require('../../models/eventSchema');

module.exports = {
    name: "registration",
    aliases: ['rejestracja'],
    async execute(message, args, client) {
        await eventSchema.findOneAndUpdate({
            guildID: message.guild.id,
            userID: message.author.id
        }, {
            $inc: {
                episodes: 0
            }
        }, {
            upsert: true
        })

        message.react(`✅`)
    }
}