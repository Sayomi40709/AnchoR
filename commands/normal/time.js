const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "time",
    description: "Yourtime!",
  },

  run: ({ interaction }) => {
    try {
      const currentDate = new Date();
      const currentTimestamp = Math.floor(currentDate.getTime() / 1000); // แปลงเวลาปัจจุบันเป็น Unix Timestamp

      const formattedTimestamp = `<t:${currentTimestamp}:F>`; // สร้างรูปแบบของแท็ก <t:>

      const embed = new EmbedBuilder()
        .setTitle("Current Time")
        .setColor("Random")
        .addFields({
          name: "Format by device default",
          value: formattedTimestamp,
        });

      interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
