const Discord = require("discord.js")

module.exports = {
    name: "list",
    aliases: ['listaet'],
    async execute(message, args, client) {
        if (!message.member.roles.cache.has(message.guild.roles.cache.find(role => role.id === "704274935320805458").id)) return message.reply("nie posiadasz uprawnień.");

        members = message.guild.roles.cache.find(role => role.id === '615455830850011156').members.map(m => m.user);

        const embed = new Discord.MessageEmbed()
            .setTitle(`LISTA EVENT TEAMU`)
            .setDescription(`${members.join('\n')}`)
            .setColor(`#ADFF2F`)
            .setTimestamp()

        message.channel.send(embed)
    }
}