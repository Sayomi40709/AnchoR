const { EmbedBuilder } = require('discord.js')

// Event: Guild Member Add
module.exports = async (member, client) => {
  client.invitesCache = new Map();
  const channelName = 'server-log'; // ชื่อของช่องสนทนาที่คุณต้องการหา
  const channel = client.channels.cache.find(channel => channel.name === channelName);
  
  try {
    const invites = await member.guild.invites.fetch();
    const cachedInvites = client.invitesCache.get(member.guild.id) || new Map();

    // Compare the invites to find the changes
    const oldInvites = cachedInvites.get(member.guild.id) || new Map();
    const newInvites = new Map();

    invites.each((invite) => {
      const { code, uses } = invite;
      newInvites.set(code, uses);
    });

    // Find the invite that was used to join
    let inviteCode;
    newInvites.forEach((uses, code) => {
      if (!oldInvites.has(code) || oldInvites.get(code) < uses) {
        inviteCode = code;
      }
    });

    // Update the invites cache
    client.invitesCache.set(member.guild.id, newInvites);

    if (inviteCode) {
      const inviteLink = `https://discord.gg/${inviteCode}`;
      const inviter = invites.get(inviteCode)?.inviter;

      const embed = new EmbedBuilder()
      .setTitle('Invite tracker')
      .addFields({ name: 'Member', value: `${member.user.tag}` })
      .addFields({ name: 'Invite link', value: `${inviteLink}` })
      .addFields({ name: 'Inviter', value: `${inviter}` })
      
      channel.send(({ embeds: [embed] }));
    } else {
      const embed = new EmbedBuilder()
      .setTitle('no invite was found.')
      .addFields({ name: 'Member', value: `${member.user.tag}` })

      channel.send(({ embeds: [embed] }));
 
    }
  } catch (error) {
    console.error(error);
  }
};