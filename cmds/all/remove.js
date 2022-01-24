const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "remove",
    aliases: ['usuńet', 'usunet'],
    async execute(message, args, client) {
        if (!message.member.roles.cache.has(message.guild.roles.cache.find(role => role.id === "704274935320805458").id)) return message.reply("nie posiadasz uprawnień.");

        let member = message.mentions.members.first()

        if (!member) {
            return message.reply(`oznacz kogoś.`)
        }

        member.roles.remove(`615455830850011156`).catch((error) => {
            return message.channel.send(`**Wystąpił nieoczekiwany błąd - jeśli ranga nie została zabrana, zabierz ją ręcznie.**\n${error}`)
        })

        const embed = new Discord.MessageEmbed()
            .setTitle(`Usunięty członek EVENT TEAM!`)
            .setDescription(`Z ekipy Event Team został usunięty członek przez ${message.author}.`)
            .addField(`Usunięta osoba:`, member, true)
            .addField(`Usunięta przez:`, message.author, true)
            .setColor(`#DC143C`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setTimestamp()

        client.channels.cache.get(`615457251246735361`).send(embed)
    }
}