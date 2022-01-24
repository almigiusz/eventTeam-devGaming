const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "set",
    aliases: ['ustaw'],
    async execute(message, args, client) {
        if (!message.member.roles.cache.has(message.guild.roles.cache.find(role => role.id === "615455830850011156").id)) return message.reply("nie posiadasz uprawnień.");

        if (message.channel.id !== `901546020046008440`) return;
        const newArgs = args.join(" ").split("|");

        if (newArgs.length < 3) {
            message.reply(`użyłeś za mało argumentów.\n*!set <ID w grze> | <NICK> | <ID SKINA W GRZE>*`).then(msg => {
                msg.delete({ timeout: 30000 })
            })
            return
        }

        if (newArgs.length > 3) {
            message.reply(`użyłeś za dużo argumentów.\n*!set <ID w grze> | <NICK> | <ID SKINA W GRZE>*`).then(msg => {
                msg.delete({ timeout: 30000 })
            })
            return
        }

        if (newArgs[0].trim().split(" ").length > 1) {
            message.reply(`przekroczyłeś limit w użyciu słów w **pierwszym** argumencie.\n*!set <ID w grze> | <NICK> | <ID SKINA W GRZE>*`).then(msg => {
                msg.delete({ timeout: 30000 })
            })
            return;
        }

        if (newArgs[1].trim().split(" ").length > 2) {
            message.reply(`przekroczyłeś limit w użyciu słów w **drugim** argumencie.\n*!set <ID w grze> | <NICK> | <ID SKINA W GRZE>*`).then(msg => {
                msg.delete({ timeout: 30000 })
            })
            return;
        }

        if (newArgs[2].trim().split(" ").length > 1) {
            message.reply(`przekroczyłeś limit w użyciu słów w **trzecim** argumencie.\n*!set <ID w grze> | <NICK> | <ID SKINA W GRZE>*`).then(msg => {
                msg.delete({ timeout: 30000 })
            })
            return;
        }

        if (!(/^\d+$/.test(newArgs[0].trim()))) {
            message.reply(`pierwszy argument to musi być ID w grze.\n*!set <ID w grze> | <NICK> | <ID SKINA W GRZE>*`).then(msg => {
                msg.delete({ timeout: 30000 })
            })
            return;
        }

        if (newArgs[2].trim().toLowerCase().includes(`brak`) || newArgs[2].trim().toLowerCase().includes(`-`) || newArgs[2].trim().toLowerCase().includes(`n/a`)) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`POTRZEBNA ZMIANA NICKU LUB SKINA!`)
                .setDescription(`${message.author} potrzebuje zmiany skina lub nicku.`)
                .addField(`ID zgłaszającego:`, newArgs[0])
                .addField(`Nick:`, newArgs[1])
                .addField(`ID skina:`, newArgs[2])
                .setColor(`#DC143C`)
                .setTimestamp()

            client.channels.cache.get(`901546020046008440`).send(`<@&695587550118805587>, <@&615455410509578250>.`, embed)

            return;
        } else if (!(/^\d+$/.test(newArgs[2].trim()))) {
            message.reply(`trzeci argument to musi być ID skina lub tekst BRAK.\n*!set <ID w grze> | <NICK> | <ID SKINA W GRZE>*`).then(msg => {
                msg.delete({ timeout: 30000 })
            })
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTitle(`POTRZEBNA ZMIANA NICKU LUB SKINA!`)
            .setDescription(`${message.author} potrzebuje zmiany skina lub nicku.`)
            .addField(`ID zgłaszającego:`, newArgs[0])
            .addField(`Nick:`, `set ${newArgs[0]} nick ${newArgs[1]}`)
            .addField(`ID skina:`, `set ${newArgs[0]} skin ${newArgs[2]}`)
            .setColor(`#DC143C`)
            .setTimestamp()

        client.channels.cache.get(`901546020046008440`).send(`<@&695587550118805587>, <@&615455410509578250>.`, embed)

        message.delete()
    }
}