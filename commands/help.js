exports.help = {
  tier: 0,
  cooldown: 500,
  args: 0
}

exports.run = (client, msg, args) => {
	let embed = new client.userLib.discord.RichEmbed().setTimestamp()
		.setAuthor("Команды Metric").setColor('#3498DB')
		.addField("Команды", `**m.stat [type] \nm.rad\nm.help\nm.invite**`, true)
		.addField("Описание", `*Вывод графика\nВывод диаграммы\nВсе команды\nПригласить бота*`, true)
		.setFooter(`© Server-Discord.com`, client.user.avatarURL);

	msg.channel.send(embed);
}