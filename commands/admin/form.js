const {
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: "form",
    description: "Request something!",
  },

  run: async ({ interaction }) => {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "Please run this command in guild",
        ephemeral: true,
      });
    }
    if (interaction.channel.name !== "form-request") {
      return interaction.reply({
        content: "กรุณาทำแบบฟอร์มในห้องที่กำหนดเท่านั้น",
        ephemeral: true,
      });
    }

    const generateRandomNumber = () => {
      let randomNumber = "";
      for (let i = 0; i < 8; i++) {
        randomNumber += Math.floor(Math.random() * 10);
      }
      return randomNumber;
    };

    const orderNumber = generateRandomNumber();

    // Create the modal
    const modal = new ModalBuilder()
      .setTitle("My Awesome Form")
      .setCustomId("AwesomeForm");

    // Create text input fields
    const tvShowInputComponent = new TextInputBuilder()
      .setCustomId("formName")
      .setLabel("What is your request?")
      .setStyle(TextInputStyle.Short);

    const haikuInputComponent = new TextInputBuilder()
      .setCustomId("requestDesc")
      .setLabel("Write down your request description.")
      .setStyle(TextInputStyle.Paragraph);

    const rows = [tvShowInputComponent, haikuInputComponent].map((component) =>
      new ActionRowBuilder().addComponents(component)
    );

    // Add action rows to form
    modal.addComponents(...rows);

    // Present the modal to the user
    await interaction.showModal(modal);

    // Verify we have the right modal
    const filter = (interaction) => interaction.customId === "AwesomeForm";
    // Submitted
    interaction
      .awaitModalSubmit({ filter, time: 60 * 60 * 1000 })
      .then(async (modalInteraction) => {
        const [formName, requestDesc] = ["formName", "requestDesc"].map((id) =>
          modalInteraction.fields.getTextInputValue(id)
        );

        // ACK the interaction
        const greenButton = new ButtonBuilder()
          .setCustomId("greenButton")
          .setLabel("Accept")
          .setStyle("Success");

        const redButton = new ButtonBuilder()
          .setCustomId("redButton")
          .setLabel("Deny")
          .setStyle("Danger");

        const row = new ActionRowBuilder().addComponents(
          greenButton,
          redButton
        );

        const embed = new EmbedBuilder()
          .setTitle(`Request name: ${formName}, code: ${orderNumber}`)
          .setDescription(`Request description: ${requestDesc}`);

        modalInteraction.reply({ embeds: [embed], components: [row] });

        const buttonFilter = (i) =>
          i.customId === "greenButton" || i.customId === "redButton";
        const collector = interaction.channel.createMessageComponentCollector({
          filter: buttonFilter,
          time: 24 * 60 * 60 * 1000, // 24 ชั่วโมง
        });

        collector.on("collect", async (i) => {
          const userRoles = i.member.roles.cache; // รับบทบาทของผู้ใช้งาน

          if (
            userRoles.some(
              (role) => role.name === "Admin" || role.name === "The Rulemaster"
            )
          ) {
            // ตรวจสอบว่าผู้ใช้งานมีบทบาท Admin หรือ Rulemaster หรือไม่
            if (i.customId === "greenButton") {
              // โค้ดเมื่อกดปุ่ม Green
              const username = i.user.username; // รับชื่อผู้ใช้ที่กดปุ่ม
              const newEmbed = new EmbedBuilder(embed)
                .addFields({
                  name: "Accepted",
                  value: "This request has been accepted.",
                })
                .addFields({
                  name: `Accepters`,
                  value: `${username}`,
                });

              await i.update({ embeds: [newEmbed], components: [] });
              const serverLogChannel = interaction.guild.channels.cache.find(
                (channel) => channel.name === "server-form"
              );
              if (serverLogChannel) {
                serverLogChannel.send({ embeds: [embed] });
              }
            } else if (i.customId === "redButton") {
              // โค้ดเมื่อกดปุ่ม Red
              const username = i.user.username; // รับชื่อผู้ใช้ที่กดปุ่ม
              const newEmbed = new EmbedBuilder(embed)
                .addFields({
                  name: "Denied",
                  value: "This request has been denied.",
                })
                .addFields({
                  name: `Denied by`,
                  value: `${username}`,
                });
              await i.update({ embeds: [newEmbed], components: [] });
            }
          } else {
            // ถ้าผู้ใช้งานไม่มีบทบาท Admin หรือ Rulemaster
            await i.reply({
              content: "You do not have permission to perform this action.",
              ephemeral: true,
            });
          }
        });
        collector.on("end", async (collected) => {
          if (collected.size === 0) {
            // No button was pressed, handle the timeout
            const newEmbed = new EmbedBuilder(embed).addFields({
              name: "Accept failure",
              value: "This request has been denied.",
            });

            modalInteraction.editReply({ embeds: [newEmbed], components: [] });
          }
        });
      })
      .catch(async (err) => {
        const embed = new EmbedBuilder()
          .setTitle(
            `Form request has error - ${interaction.member.user.username}`
          )
          .setDescription(`${err}`);

        await interaction.channel.send({ embeds: [embed] });
      });
  },
  deleted: true,
};
