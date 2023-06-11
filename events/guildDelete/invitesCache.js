// Event: Guild Delete
module.exports = async (guild) => {
    client.invitesCache.delete(guild.id);
  };