const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "pattern",
    aliases: ['wzor', 'wzór'],
    async execute(message, args, client) {
        const content = args.join(" ");
        // if (!args[0] || !args[0].startsWith(`Dane postaci epizodycznej`)) return message.reply(`upewnij się, że wpisałeś cokolwiek po komendzie wzór.`)
        if (!args[0] || !content.startsWith('Dane postaci epizodycznej')) return message.reply(`upewnij się, że wpisałeś poprawnie wzór po komendzie **wzór**.`)

        try {
            message.channel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "@everyone"), { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'CREATE_INSTANT_INVITE': false });
            message.channel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "*allow.ticket"), { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'CREATE_INSTANT_INVITE': false });
            message.channel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "Event Team"), { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'CREATE_INSTANT_INVITE': false });
        } catch (error) {
            return console.log(error)
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Tworzenie epizodów`, client.user.avatarURL())
            .setDescription(`**Cześć ${message.author.username}!**\nWłaśnie powiadomiłem członków Event Team o tym, że jesteś zainteresowany wspólną rozgrywką!\n\nZa jakiś czas ktoś powinien Ci odpisać, natomiast jeżeli tak by się nie stało, możesz oznaczyć <@&615455830850011156> a z pewnością po chwili ktoś zauważy Twoją prośbę o odegranie epizodu!\n\nJeżeli źle uzupełniłeś wzór - ktoś powinien dać Ci o tym znać. Pamiętaj jednak, żeby całą wiadomość wraz z komendą !wzór wysyłać jako jedną wiadomość!\n\n**Gdy epizod dobiegnie końca, wpisz komende** \`!zakończepizod\` **na tym kanale, ułatwisz nam dzięki temu robotę!**\nPamiętaj, że ten kanał nie służy do **spamowania**, poruszaj tutaj najważniejsze kwestie związane z Twoim epizodem - dyskusje niezwiązane z epizodem przenieś na prywatną konwersacje.\n\n**Twój wypełniony wzór:**\n${content}`)
            .setColor(`#3ba55d`)
            .setTimestamp()

        message.channel.send(embed)
    }
}