module.exports = {
  data: {
    name: "ping",
    description: "Ping!",
  },

  run: async ({ interaction }) => {
    try {
      if (!interaction.inGuild()) {
        return interaction.reply({
          content: "Please run this command in guild",
          ephemeral: true,
        });
      }
      const delay = Date.now() - interaction.createdTimestamp;
      const websocketPing = interaction.client.ws.ping;
      await interaction.reply(
        `Websocket: ${websocketPing}ms, Delay: ${delay}ms`
      );
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
