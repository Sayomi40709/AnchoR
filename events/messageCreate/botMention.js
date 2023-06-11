 module.exports = (message, client) =>{
 // Check if bot is mentioned in message
  if (message.mentions.has(client.user.id) && !message.content.includes('@everyone') && !message.content.includes('@here')) {
    return message.reply('Yes, I am here!');
  }
}