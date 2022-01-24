const Discord = require("discord.js")
const { MessageButton } = require("discord-buttons");
const eventSchema = require('../../models/eventSchema');

module.exports = {
    name: "episodes",
    aliases: ['epizody'],
    async execute(message, args, client) {

        let u = ''
        let sortedMembers = await eventSchema.find({}).select(`userID`).select(`episodes`);

        let filtredMembers = sortedMembers.sort((a, b) => b.episodes - a.episodes).slice(0, 50)

        let filtredMembers2 = sortedMembers.sort((a, b) => b.episodes - a.episodes)
        const item = filtredMembers2.find(element => element.userID === `${message.author.id}`)
        const search = filtredMembers2.indexOf(item)

        for (let i = 0; i < filtredMembers.length; i++) {

            let FetchUser = await client.users.fetch(filtredMembers[i].userID)

            let guild = client.guilds.cache.get('615452646123241482');
            let member = guild.member(FetchUser);
            let nickname = member ? member.displayName : null;
            // console.log(nickname)
            // u += (`\`${i + 1}\` ${FetchUser.tag} **—** ${reputacja} ⭐\n`)
            u += (`\`${i + 1}.\` ${nickname} *(${FetchUser.tag})* - **${filtredMembers[i].episodes}**\n`)
        }

        let episodes = 0

        for (let i = 0; i < filtredMembers.length; i++) {
            episodes += (filtredMembers[i].episodes)
        }


        const embed = new Discord.MessageEmbed()
            .setAuthor(`Epizody`, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Wszystkich epizodów w tym miesiącu: **${episodes}**\nTwoje miejsce w rozegranych epizodach: **${search + 1}**`)
            // .setTitle(`NOWA AKTYWNOŚĆ!`)
            .addField(`Rozegrane epizody w tym miesiącu:`, u)
            .setColor(`#60d85e`)
            .setTimestamp()

        message.channel.send(embed)
    }
}