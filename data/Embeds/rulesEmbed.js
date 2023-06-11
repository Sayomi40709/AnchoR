require("dotenv").config();
const { EmbedBuilder } = require('discord.js');

const createEmbed1 = (client) => {
  const guildID = process.env.GUILD_ID;
  const guild = client.guilds.cache.get(guildID);

  const embed = new EmbedBuilder()
    .setColor('#FF0000')
    .setTitle('Rule 1')
    .setThumbnail(guild.iconURL())
    .setDescription('Do not spam')
    .addFields({ name: 'Consequences', value: 'Violating this rule may result in a warning or mute.' });

  return embed;
};

const createEmbed2 = (client) => {
  const guildID = process.env.GUILD_ID;
  const guild = client.guilds.cache.get(guildID);

  const embed = new EmbedBuilder()
    .setColor('#FF0000')
    .setTitle('Rule 2')
    .setThumbnail(guild.iconURL())
    .setDescription('Do not disturb')
    .addFields({ name: 'Consequences', value: 'Violating this rule may result in a warning.' });

  return embed;
};

module.exports = {
  createEmbed1,
  createEmbed2,
};
