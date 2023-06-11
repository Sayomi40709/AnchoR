const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  data: {
    name: "userinfo",
    description: "Show user information",
    options: [
      {
        name: "member",
        description: "Othermember.",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },

  run: ({ interaction }) => {
    try {
      if (!interaction.inGuild()) {
        return interaction.reply({
          content: "Please run this command in guild",
          ephemeral: true,
        });
      }

      const othermember = interaction.options.get("member").user;

      if (othermember) {
        const embed = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle("User Information")
          .setThumbnail(othermember.displayAvatarURL())
          .addFields(
            { name: "Username", value: othermember.username, inline: true },
            {
              name: "Discriminator",
              value: `#${othermember.discriminator}`,
              inline: true,
            },
            { name: "Created At", value: `${othermember.createdAt}` }
          );
        interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
