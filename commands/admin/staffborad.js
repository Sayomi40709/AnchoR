const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "staff",
    description: "All staff available",
  },
  run: ({ interaction }) => {
    try {
      if (!interaction.inGuild()) {
        return interaction.reply({
          content: "Please run this command in guild",
          ephemeral: true,
        });
      }
      const adminRole = interaction.guild.roles.cache.find(
        (role) => role.name === "หน่วยรักษาการณ์"
      );
      const rulemasterRole = interaction.guild.roles.cache.find(
        (role) => role.name === "คณะบริหารส่วนกลาง"
      );
      const membersWithAdminRole = adminRole.members;
      const membersWithrulemasterRole = rulemasterRole.members;

      const embed = new EmbedBuilder()
        .setTitle("รายชื่อStaffทั้งหมด")
        .setDescription("รายชื่อสตาฟและสถานะปัจจุบัน")
        .setColor(`#0099FF`)
        .addFields({
          name: "ชื่อ",
          value: `<@${membersWithAdminRole
            .map((member) => member.user.id)
            .join("> \n<@")}>`,
          inline: true,
        })
        .addFields({
          name: "บทบาท",
          value: `${membersWithAdminRole
            .map((member) => member.roles.highest)
            .join(" \n")}`,
          inline: true,
        })
        .addFields({
          name: "สถานะ",
          value: `${membersWithAdminRole
            .map((member) => member.presence?.status || "offline")
            .join(" \n")}`,
          inline: true,
        })
        .setFooter({
          text: `ข้อมูล Staff ทั้งหมด ณ วันที่ ${new Date().toLocaleString()}`,
        });
      if (rulemasterRole) {
        embed.addFields({
          name: "ชื่อ",
          value: `<@${membersWithrulemasterRole
            .map((member) => member.user.id)
            .join("> \n<@")}>`,
          inline: true,
        });
        embed.addFields({
          name: "บทบาท",
          value: `${membersWithrulemasterRole
            .map((member) => member.roles.highest)
            .join(" \n")}`,
          inline: true,
        });
        embed.addFields({
          name: "สถานะ",
          value: `${membersWithrulemasterRole
            .map((member) => member.presence?.status || "offline")
            .join(" \n")}`,
          inline: true,
        });
      }

      interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
