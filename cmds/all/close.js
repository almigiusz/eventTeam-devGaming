const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js");

module.exports = {
    name: "close",
    aliases: [''],
    async execute(message, args, client) {
        if (!message.channel.name.startsWith('ticket')) return message.reply(`ten kanał nie jest ticketem.`)
        message.react(`✅`)
        message.channel.send(`Trwa archiwizacja epizodu.`)

        try {
            message.channel.setParent(`902869592756617237`);
            message.channel.send(`Epizod został zarchiwizowany przez ${message.author}.`)
            message.channel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "@everyone"), { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'CREATE_INSTANT_INVITE': false });
            message.channel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "*allow.ticket"), { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'CREATE_INSTANT_INVITE': false });
            message.channel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "Event Team"), { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'CREATE_INSTANT_INVITE': false });
        } catch (error) {
            return console.log(error)
        }

        // message.channel.updateOverwrite(message.author, { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'CREATE_INSTANT_INVITE': false });
        // message.channel.updateOverwrite(button.message.guild.roles.cache.find(role => role.name === "*allow.ticket"), { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'CREATE_INSTANT_INVITE': false });
    }

}