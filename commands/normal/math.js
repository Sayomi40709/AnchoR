const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  data: {
    name: "math",
    description: "Calculator!",
    options: [
      {
        name: "first-number",
        description: "The first number.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "operator",
        description: "The operators.",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "+",
            value: "+",
          },
          {
            name: "-",
            value: "-",
          },
          {
            name: "*",
            value: "*",
          },
          {
            name: "/",
            value: "/",
          },
          {
            name: "**",
            value: "**",
          },
          {
            name: "%",
            value: "%",
          },
        ],
      },
      {
        name: "second-number",
        description: "The second number.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  run: ({ interaction }) => {
    try {
      const num1 = interaction.options.get("first-number").value;
      const num2 = interaction.options.get("second-number").value;
      const operator = interaction.options.get("operator").value;

      let result;
      switch (operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "/":
          result = num1 / num2;
          break;
        case "**":
          result = num1 ** num2;
          break;
        case "%":
          result = num1 % num2;
          break;
        default:
          return interaction.reply("Invalid operator.");
      }

      interaction.reply(`The result is ${result}`);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
