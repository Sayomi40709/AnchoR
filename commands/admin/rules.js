const { ApplicationCommandOptionType } = require("discord.js");
const {
  createEmbed1: embed1,
  createEmbed2: embed2,
  createEmbed3: embed3,
  // เพิ่ม module อื่น ๆ ตามต้องการ
} = require("../../data/Embeds/rulesEmbed");

module.exports = {
  data: {
    name: "rule",
    description: "Rules!",
    options: [
      {
        name: "number",
        description: "Rules number.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  run: ({ interaction }) => {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "Please run this command in guild",
        ephemeral: true,
      });
    }
    try {
      const rules = interaction.options.get("number").value;

      let embed;
      switch (rules) {
        case 1:
          embed = embed1(interaction.client);
          break;
        case 2:
          embed = embed2(interaction.client);
          break;
        // เพิ่ม case ตาม module อื่น ๆ ที่ต้องการ
        default:
          return interaction.reply({
            content: "This rule does not exist.",
            ephemeral: true,
          });
      }
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
