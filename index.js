require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const Path = require("path");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.GuildPresences,
  ],
});

new CommandHandler({
  client,
  eventsPath: Path.join(__dirname, "events"),
  commandsPath: Path.join(__dirname, "commands"),
});

// Login to Discord with your bot token
client.login(process.env.TOKEN);
