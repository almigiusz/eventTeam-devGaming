const Discord = require("discord.js");
const eventSchema = require('../../models/eventSchema');

module.exports = {
    name: "clear",
    aliases: [],
    async execute(message, args, client) {
        if (!message.member.roles.cache.has(message.guild.roles.cache.find(role => role.id === "704274935320805458").id)) return message.reply("nie posiadasz uprawnień.");

        await eventSchema.updateMany({
        }, {
            $set: {
                episodes: 0
            }
        }, {
            upsert: true
        })

        message.react(`✅`)
    }
}