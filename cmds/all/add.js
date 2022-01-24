const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "dodajet",
    aliases: [],
    async execute(message, args, client) {
        if (!message.member.roles.cache.has(message.guild.roles.cache.find(role => role.id === "704274935320805458").id)) return message.reply("nie posiadasz uprawnień.");

        let member = message.mentions.members.first()

        if (!member) {
            return message.reply(`oznacz kogoś.`)
        }

        member.roles.add(`615455830850011156`).catch((error) => {
            return message.channel.send(`**Wystąpił nieoczekiwany błąd - jeśli ranga nie została nadana, nadaj ją ręcznie.**\n${error}`)
        })

        const embed = new Discord.MessageEmbed()
            .setTitle(`Nowy członek EVENT TEAM!`)
            .setDescription(`W ekipie Event Team pojawił się nowy członek dodany przez ${message.author}.`)
            .addField(`Nowa osoba:`, member, true)
            .addField(`Dodana przez:`, message.author, true)
            .setColor(`#ADFF2F`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setTimestamp()

        client.channels.cache.get(`615457251246735361`).send(embed)
    }
}