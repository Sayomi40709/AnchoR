require("dotenv").config();
const { AuditLogEvent, EmbedBuilder } = require('discord.js');

module.exports = async ({ client }) => {
  const channelName = 'ban-reports'; // ชื่อของช่องสนทนาที่คุณต้องการหา
  const channel = client.channels.cache.find(channel => channel.name === channelName);

  client.guilds.cache.forEach(guild => {
    if(!channel) {
      console.log(`Can't find any channel that name '${channelName}' in '${guild.name}'`); return
    }
    if (guild) {
      guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd, limit: 1 })
        .then(auditLogs => {
          const auditLogEntry = auditLogs.entries.first();
          const { executor, target } = auditLogEntry;

          // Create the embed message
          const embed = new EmbedBuilder()

            .setTitle('Ban Report')
            .setColor('#FF0000')
            .addFields({ name: 'Executer', value: executor.tag })
            .addFields({ name: 'Target', value: target.tag })
            .setTimestamp();

          // Send the embed message to the channel
          channel.send(({ embeds: [embed] }));
        })
        .catch(console.error);
    }
  })
}
