const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "serverinfo",
    description: "Show server information",
  },
  run: async ({ interaction }) => {
    try {
      if (!interaction.inGuild()) {
        return interaction.reply({
          content: "Please run this command in guild",
          ephemeral: true,
        });
      }
      const guild = interaction.guild;
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Server Information")
        .setThumbnail(guild.iconURL())
        .addFields(
          { name: "Server Name", value: guild.name, inline: true },
          { name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
          { name: "Member Count", value: `${guild.memberCount}`, inline: true },
          { name: "Created At", value: `${guild.createdAt}` }
        );

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
