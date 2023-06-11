const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "nowonline",
    description: "Nowonline!",
  },
  run: ({ interaction }) => {
    try {
      if (!interaction.inGuild()) {
        return interaction.reply({
          content: "Please run this command in guild",
          ephemeral: true,
        });
      }
      const guild = interaction.guild;
      const OnlineMembers = interaction.guild.members.cache.filter(
        (member) => member.presence?.status === "online"
      );
      const onlineMemberCount = OnlineMembers.size;
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Server Information")
        .setThumbnail(guild.iconURL())
        .addFields({ name: "membersonline", value: `${onlineMemberCount}` });
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
