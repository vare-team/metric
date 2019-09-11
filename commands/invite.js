exports.help = {
  tier: 0,
  cooldown: 1500,
  args: 0
}

exports.run = (client, msg, args) => {
  let embed = new client.userLib.discord.RichEmbed()
    .setAuthor(client.user.tag, client.user.avatarURL)
    .setTitle('Пригласить бота')
    .setURL('https://discordapp.com/api/oauth2/authorize?client_id=581105176899747851&permissions=52352&scope=bot')
    .setColor("#15f153")
    .setFooter("With ❤ from server-discord.com");

	msg.channel.send(embed);
}