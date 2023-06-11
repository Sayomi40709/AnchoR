module.exports = {
  data: {
    name: "test",
    description: "testing!",
  },

  run: async ({ interaction }) => {
    try {
      if (!interaction.inGuild()) {
        return interaction.reply({
          content: "Please run this command in guild",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
