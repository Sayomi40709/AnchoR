const Role = require('../../data/database/roles');
const { EmbedBuilder } = require('discord.js');

module.exports = async (member, client) => {
  const channelName = 'server-log';
  const channel = client.channels.cache.find(channel => channel.name === channelName);
  if (!channel) {
    console.log(`Can't find any channel with the name '${channelName}' in '${member.guild.name}'`);
    return;
  }

  try {
    const roleData = await Role.findOne({ userId: member.id, guildId: member.guild.id, leftAt: { $exists: true } });
    if (roleData && roleData.roles) { // เพิ่มเงื่อนไขตรวจสอบ roleData.roles ไม่ใช่ undefined
      const roles = roleData.roles;
      const roleObjects = roles
        .map(roleName => member.guild.roles.cache.find(role => role.name === roleName))
        .filter(role => role.comparePositionTo(member.guild.roles.highest) < 0);

      await member.roles.add(roleObjects);

      const roleNames = roles.filter(roleName => roleName !== '@everyone');
      const embed = new EmbedBuilder()
        .setTitle('Return Role')
        .setColor(`Random`)
        .addFields({ name: 'Returned roles to', value: member.user.tag })
        .addFields({ name: 'Roles', value: roleNames.join(', ') })
        .setTimestamp();

      channel.send({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setTitle(`No roles found for ${member.user.tag}`)
        .setTimestamp();
      channel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.log(error)
  }
};
