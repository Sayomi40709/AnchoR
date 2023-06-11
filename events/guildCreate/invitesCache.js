// Event: Guild Create
module.exports = async (guild) => {
    client.invitesCache.set(guild.id, new Map());
  };