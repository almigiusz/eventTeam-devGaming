const fs = require('fs');
const Discord = require("discord.js");
const chalk = require("chalk")

const { MessageButton, MessageActionRow } = require("discord-buttons");

const client = new Discord.Client();
client.commands = new Map();

require('discord-buttons')(client);
require("dotenv").config();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command.handler", "event.handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.on('ready', async () => {
  console.log(`[${client.user.username}] Połączono przy użyciu Discord API.`)
  client.user.setActivity('Event Team | by almi.', { type: 'WATCHING' });
});

client.on('clickButton', async (button) => {
  if (button.id === 'ticket') {
    button.message.guild.channels.create(`ticket-${button.clicker.user.id}`, { parent: `902869470253572137` }).then(async channel => {
      channel.updateOverwrite(button.clicker.user, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'CREATE_INSTANT_INVITE': false });
      channel.updateOverwrite(button.message.guild.roles.cache.find(role => role.name === "*allow.ticket"), { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'CREATE_INSTANT_INVITE': false });
      channel.updateOverwrite(button.message.guild.roles.cache.find(role => role.name === "@everyone"), { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'CREATE_INSTANT_INVITE': false });

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Tworzenie epizodu`, client.user.avatarURL())
        .setDescription(`**Cześć ${button.clicker.user.username}!** Świetnie, że skontaktowałeś się z członkami Event Teamu!\n\nJedyne co Ci teraz pozostało, to zajęcie się poniższym wzorem i wysłanie go tutaj na kanał **w formie podanej poniżej, nie zapomnij o !wzór na początku!**\n\n\`!wzór Dane postaci epizodycznej:\nPreferowana data wraz z godziną:\nIlość osób potrzebna do realizacji epizodu:\nPrzedmioty/pojazdy potrzebne do realizacji epizodu:\nKrótki opis epizodu:\`\n\nJeżeli nie otrzymałeś ode mnie żadnej sensownej odpowiedzi po wpisaniu komendy, to znak że zrobiłeś coś źle - spróbuj wpisać komendę jeszcze raz!\n**Jeżeli gra z członkami Event Team nie sprawiała Ci przyjemności i masz wobec nich jakieś skargi, skontaktuj się z jednym z <@&704274935320805458>.**`)
        .setTimestamp()
        .setColor("#3ba55d");

      const c = new MessageButton()
        .setStyle(`green`)
        .setEmoji(`🔒`)
        .setLabel(`Archiwizacja epizodu`)
        .setID(`close`)

      await channel.send(`**__Przeczytaj informacje zawarte poniżej, ${button.clicker.member}!__**`, { buttons: [c], embed: embed });
      await channel.setTopic(`${button.clicker.user.id}`)

    })
  }

  if (button.id === 'close') {
    button.message.channel.send(`Trwa archiwizacja epizodu.`)

    try {
      button.channel.setParent(`902869592756617237`);
      button.channel.send(`Epizod został zarchiwizowany przez ${button.clicker.user}.`)
      button.channel.updateOverwrite(button.message.guild.roles.cache.find(role => role.name === "@everyone"), { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'CREATE_INSTANT_INVITE': false });
      button.channel.updateOverwrite(button.message.guild.roles.cache.find(role => role.name === "*allow.ticket"), { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'CREATE_INSTANT_INVITE': false });
      button.channel.updateOverwrite(button.message.guild.roles.cache.find(role => role.name === "Event Team"), { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'CREATE_INSTANT_INVITE': false });
    } catch (error) {
      return button.message.channel.send(`Archiwizacja epizodu się nie powiodła.\n**${error}**`)
    }

  }
})

client.login(process.env.DISCORD_TOKEN);