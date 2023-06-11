const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  data: {
    name: "roll",
    description: "Roll one or more dice",
    options: [
      {
        name: "quantity",
        description: "Number of dice to roll.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "sides",
        description: "Number of sides on each die.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  run: async ({ interaction }) => {
    try {
      const quantity = interaction.options.get("quantity").value;
      const sides = interaction.options.get("sides").value;
      let rolls = [];
      let sum = 0;
      for (let i = 0; i < quantity; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        sum += roll;
      }
      const response = `You rolled ${quantity} dice with ${sides} sides each:\n${rolls.join(
        ", "
      )}\nTotal: ${sum}`;
      interaction.reply(response);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
