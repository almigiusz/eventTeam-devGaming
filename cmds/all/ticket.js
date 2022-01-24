const Discord = require("discord.js")
const { MessageButton } = require("discord-buttons");

module.exports = {
    name: "ticket",
    aliases: [],
    async execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Tworzenie epizodów`, client.user.avatarURL())
            .setDescription(`W celu stworzenia swojego epizodu naciśnij na przycisk:\n**Stwórz epizod!**`)
            .setColor(`#3ba55d`)
            .setTimestamp()

        const t = new MessageButton()
            .setStyle(`green`)
            .setEmoji(`🎫`)
            .setLabel(`Stwórz epizod!`)
            .setID(`ticket`)

        client.channels.cache.get(`902863514627092500`).send({ buttons: [t], embed: embed })
    }
}