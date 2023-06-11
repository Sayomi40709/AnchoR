const Role = require('../../data/database/roles');
const { EmbedBuilder } = require('discord.js')

module.exports = async (member, client) => {
  const channelName = 'server-log'; // ชื่อของช่องสนทนาที่คุณต้องการหา
  const channel = client.channels.cache.find(channel => channel.name === channelName);
  if(!channel) {
    console.log(`Can't find any channel that name '${channelName}' in '${guild.name}'`); return
  }
  try {
    const roles = member.roles.cache.map(role => role.name);
    const guildId = member.guild.id;
    const userId = member.id;

    await Role.findOneAndUpdate(
      { userId, guildId },
      { roles, leftAt: new Date() },
      { upsert: true }
    );

    const roleNames = roles.filter(roleName => roleName !== '@everyone');
    const embed = new EmbedBuilder()

      .setTitle('Update Role')
      .setColor(`Random`)
      .addFields({ name: 'Updated roles for', value: member.user.tag })
      .addFields({ name: 'Roles', value: roleNames.join(', ') })
      .setTimestamp();

    channel.send(({ embeds: [embed] }));
  } catch (error) {
    console.error(error);
  }
}