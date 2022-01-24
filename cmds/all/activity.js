const Discord = require("discord.js");
const eventSchema = require('../../models/eventSchema');

module.exports = {
    name: "activity",
    aliases: ['aktywnosc', 'aktywność'],
    async execute(message, args, client) {
        if (!message.member.roles.cache.has(message.guild.roles.cache.find(role => role.id === "615455830850011156").id)) return message.reply("nie posiadasz uprawnień.");

        const eventData = await eventSchema.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        })

        if (!eventData || eventData === null) {
            return message.reply(`żeby skorzystać z tej komendy, musisz zostać zarejestrowany.\nUżyj komendy: **!rejestracja**.`)
        }

        const bicon = client.user.displayAvatarURL();

        const filter = m => m.author.id == message.author.id

        const embed_main = new Discord.MessageEmbed()
            .setThumbnail(bicon)
            .setTitle(`DODAWANIE AKTYWNOŚCI`)
            .setDescription(`Cześć ${message.author}. Wypełnij poniższy krok aby dodać swoją aktywność.\n\n⚠️ **Pamiętaj!** Między punktami masz około piętnaście minut na odpowiedź, jeżeli ten czas minie, dodawanie aktywności zostanie **anulowane!**`)
            .addField(`DODAWANIE AKTYWNOŚCI (1/4)`, `Podaj nick In Character którego używałeś, podczas odgrywania całej akcji.`)
            .setFooter(`Data`)
            .setColor(`#DC143C`)
            .setTimestamp();
        const mainMessage = await message.author.send(embed_main).catch((error) => message.channel.send(`Wystąpił nieoczekiwany błąd - sprawdź czy twoje wiadomości od nieznajomych są skanowane, oraz czy nie masz zablokowanego bota.\n**${error}**`))
        message.author.send(mainMessage)

        await mainMessage.channel.awaitMessages(filter, { max: 1, time: 900000, errors: ['time'] })
            .then(async collected => {
                const nickIC = collected.first().content
                message.delete()

                const embed_nickIC = new Discord.MessageEmbed()
                    .setThumbnail(bicon)
                    .setTitle(`DODAWANIE AKTYWNOŚCI`)
                    .setDescription(`Poprawnie przyjęto nick In Character. Teraz podaj datę odegrania całego wydarzenia.`)
                    .addField(`Nick IC:`, `${nickIC}`)
                    .addField(`Data odegrania wydarzenia:`, `**TERAZ WPISUJESZ.**`)
                    .addField(`Opis:`, `BRAK.`)
                    .addField(`Link:`, `BRAK.`)
                    .setFooter(`Data`)
                    .setColor(`#DC143C`)
                    .setTimestamp();
                mainMessage.edit({ embed: embed_nickIC })

                const filter = m => m.author.id == message.author.id
                await mainMessage.channel.awaitMessages(filter, { max: 1, time: 900000, errors: ['time'] })
                    .then(async collected => {
                        const eventDate = collected.first().content
                        const embed_name = new Discord.MessageEmbed()
                            .setThumbnail(bicon)
                            .setTitle(`DODAWANIE AKTYWNOŚCI`)
                            .setDescription(`Poprawnie przyjęto datę odegrania wydarzenia. Teraz opisz dość krótko, co robiłeś na wydarzeniu.`)
                            .addField(`Nick IC:`, `${nickIC}`)
                            .addField(`Data odegrania wydarzenia:`, `${eventDate}`)
                            .addField(`Opis:`, `**TERAZ WPISUJESZ.**`)
                            .addField(`Link:`, `BRAK.`)
                            .setFooter(`Data`)
                            .setColor(`#DC143C`)
                            .setTimestamp();
                        mainMessage.edit({ embed: embed_name })

                        await mainMessage.channel.awaitMessages(filter, { max: 1, time: 900000, errors: ['time'] })
                            .then(async collected => {
                                const Description = collected.first().content
                                const embed_description = new Discord.MessageEmbed()
                                    .setThumbnail(bicon)
                                    .setTitle(`DODAWANIE AKTYWNOŚCI`)
                                    .setDescription(`Poprawnie przyjęto opis odegranego wydarzenia. Teraz wklej załącznik **PAMIĘTAJ, ŻE MUSI TO BYĆ LINK (NP. IMGUR), A NIE ZDJĘCIE Z KOMPUTERA**.`)
                                    .addField(`Nick IC:`, `${nickIC}`)
                                    .addField(`Data odegrania wydarzenia:`, `${eventDate}`)
                                    .addField(`Opis:`, `${Description}`)
                                    .addField(`Link:`, `**TERAZ WPISUJESZ.**`)
                                    .setFooter(`Data`)
                                    .setColor(`#DC143C`)
                                    .setTimestamp();
                                mainMessage.edit({ embed: embed_description })

                                await mainMessage.channel.awaitMessages(filter, { max: 1, time: 900000, errors: ['time'] })
                                    .then(async collected => {

                                        const Links = collected.first().content
                                        const embed_eligible = new Discord.MessageEmbed()
                                            .setThumbnail(bicon)
                                            .setTitle(`DODAWANIE AKTYWNOŚCI`)
                                            .setDescription(`Czy wszystko się zgadza? Wpisz "TAK" lub "NIE".`)
                                            .addField(`Nick IC:`, `${nickIC}`)
                                            .addField(`Data odegrania wydarzenia:`, `${eventDate}`)
                                            .addField(`Opis:`, `${Description}`)
                                            .addField(`Link:`, `${Links}`)
                                            .setFooter(`Data`)
                                            .setColor(`#DC143C`)
                                            .setTimestamp();
                                        mainMessage.edit({ embed: embed_eligible })

                                        const verify = await mainMessage.channel.awaitMessages(filter, { max: 1, time: 900000 });

                                        const yes = [`Tak`, `TAk`, `TAK`, `tAK`, `TaK`, `tAk`, `taK`, `tak`, `Yes`, `YEs`, `YES`, `yES`, `YeS`, `yEs`, `yeS`, `yes`];
                                        const no = [`Nie`, `NIe`, `NIE`, `nIE`, `NiE`, `nIe`, `niE`, `nie`, `no`, `No`, `nO`, `NO`]

                                        let choice = verify.first().content
                                        if (!yes.includes(choice) || !no.includes(choice)) {
                                            const embed_nic = new Discord.MessageEmbed()
                                                .setThumbnail(bicon)
                                                .setTitle(`DODAWANIE AKTYWNOŚCI`)
                                                .setDescription(`Dodawanie aktywności zostało anulowane. Wpisz ponownie komendę by rozpocząć od nowa.`)
                                                .setFooter(`Data`)
                                                .setColor(`#DC143C`)
                                                .setTimestamp();
                                            mainMessage.edit({ embed: embed_nic })
                                        }
                                        if (yes.includes(choice)) {
                                            const embedYes = new Discord.MessageEmbed()
                                                .setThumbnail(bicon)
                                                .setTitle(`DODAWANIE AKTYWNOŚCI`)
                                                .setDescription(`Dane zostały poprawnie zapisane, a wiadomość z twoją aktywnością została wysłana na odpowiedni kanał.`)
                                                .setFooter(`Data`)
                                                .setColor(`#60d85e`)
                                                .setTimestamp();
                                            mainMessage.edit({ embed: embedYes })

                                            const embed = new Discord.MessageEmbed()
                                                .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                                                .setTitle(`NOWA AKTYWNOŚĆ!`)
                                                .addField(`Opis eventu:`, Description)
                                                .addField(`Nick postaci:`, nickIC, true)
                                                .addField(`Data gry:`, eventDate, true)
                                                .addField(`Link:`, Links, true)
                                                .setColor(`#60d85e`)
                                                .setTimestamp()

                                            client.channels.cache.get(`900684049314619422`).send(embed)

                                            await eventSchema.findOneAndUpdate({
                                                guildID: message.guild.id,
                                                userID: message.author.id
                                            }, {
                                                $inc: {
                                                    epizody: 1
                                                }
                                            }, {
                                                upsert: true
                                            })
                                        }
                                        if (no.includes(choice)) {
                                            const embedNo = new Discord.MessageEmbed()
                                                .setThumbnail(bicon)
                                                .setTitle(`DODAWANIE AKTYWNOŚCI`)
                                                .setDescription(`Dodawanie aktywności zostało anulowane. Wpisz ponownie komendę by rozpocząć od nowa.`)
                                                .setFooter(`Data`)
                                                .setColor(`#DC143C`)
                                                .setTimestamp();
                                            mainMessage.edit({ embed: embedNo })
                                        }
                                    })
                            })
                    })
            })
    }
}
