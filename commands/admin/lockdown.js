const {
  ApplicationCommandOptionType,
  PermissionsBitField,
} = require("discord.js");
module.exports = {
  data: {
    name: "lockdown",
    description: "Lockdown command",
    options: [
      {
        name: "channel",
        description: "Channel.",
        type: ApplicationCommandOptionType.Channel,
        required: true,
      },
      {
        name: "unlock",
        description: "Unlock channel.",
        type: ApplicationCommandOptionType.Boolean,
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
      // ตรวจสอบว่าผู้ใช้งานมีสิทธิ์ในการใช้งานคำสั่งนี้หรือไม่
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      ) {
        return interaction.reply({
          content: "คุณไม่มีสิทธิ์ในการใช้คำสั่งนี้",
          ephemeral: true,
        });
      }

      // รับ parameter จาก interaction
      const channel = interaction.options.getChannel("channel");
      // ตรวจสอบว่า parameter ถูกต้องหรือไม่
      if (channel.type !== 0) {
        return interaction.reply({
          content: "กรุณาระบุช่องข้อความที่ต้องการล็อกดาวน์",
          ephemeral: true,
        });
      }
      if (interaction.options.get("channel")) {
        channel.permissionOverwrites.edit(interaction.guild.id, {
          SendMessages: false,
        });
      }

      if (interaction.options.getBoolean("unlock")) {
        const channel = interaction.options.getChannel("channel");
        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
          SendMessages: null,
        });
        interaction.reply({
          content: `ปลดล็อกดาวน์ในห้อง ${channel} เรียบร้อยแล้ว`,
        });
        const threads = interaction.guild.channels.cache.filter(
          (channel) => channel.type === 11
        );
        threads.forEach((thread) => {
          thread.delete();
        });
        return;
      }

      // สร้าง Thread ใหม่
      channel.threads
        .create({
          name: "Lockdown Thread",
          autoArchiveDuration: 60, // ตั้งเวลา Archive เป็น 60 นาที
        })
        .then((thread) => {
          // ส่งข้อความไปยัง Thread
          thread.send("โปรดอยู่ในความสงบ จนกว่าจะมีการแก้ไข");
        });

      interaction.reply({
        content: `ทำการล็อกดาวน์ในห้อง ${channel} เรียบร้อยแล้ว`,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
